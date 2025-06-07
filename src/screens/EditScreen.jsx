import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gun from "../gun";
import { checkIsValid, debounce } from "../utils";
import { useFairy, useInput } from "../hooks";
import { SEA } from "gun";
import DiscussImage from "../assets/ik-discuss.webp";
import { BackButton, ZenInput } from "../components";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import CircleLoader from "../components/CircleLoader";

function EditScreen() {
    const { id } = useParams();
    const { addNotification } = useFairy();
    const [currImgLoading, setCurrImgLoading] = useState(false);
    const [postData, setPostData] = useState(null);
    const title = useInput("");
    const thumbnail = useInput("");
    const content = useInput("");

    const navigate = useNavigate();

    const [previewSrc, setPreviewSrc] = useState(DiscussImage);
    const debounceRef = useRef();

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!thumbnail.value) {
            setPreviewSrc(DiscussImage);
            return;
        }

        setCurrImgLoading(true);
        debounceRef.current = setTimeout(() => {
            const img = new Image();
            img.onload = () => {
                setPreviewSrc(thumbnail.value);
                setCurrImgLoading(false);
            };
            img.onerror = () => {
                setPreviewSrc(DiscussImage);
                setCurrImgLoading(false);
            };
            img.src = thumbnail.value;
        }, 400); // Adjust delay as needed
    }, [thumbnail.value]);

    useEffect(() => {
        const fetchPostData = () => {
            let tempData = null;
            const waitForSetPost = debounce(() => {
                if (tempData) {
                    const user = gun.user();
                    if (tempData.author_id !== user.is.pub) {
                        navigate('/feed');
                        return;
                    }

                    setPostData(tempData);
                    title.setNewValue(tempData.title);
                    content.setNewValue(tempData.content);
                    thumbnail.setNewValue(tempData.thumbnail);
                } else {
                    console.log("Post not found");
                }
            }, 250);
            gun.get("ik-posts")
                .get(id)
                .once(async (data) => {
                    const secret = import.meta.env.VITE_GUNKEY;
                    let {
                        id,
                        author_id,
                        author_name,
                        created,
                        title,
                        content,
                        thumbnail,
                    } = data;

                    title = await SEA.decrypt(title, secret);

                    if (thumbnail && thumbnail !== "") {
                        thumbnail = await SEA.decrypt(thumbnail, secret);
                    }

                    content = await SEA.decrypt(content, secret);

                    let newData = {
                        id,
                        author_id,
                        author_name,
                        created,
                        title,
                        content,
                        thumbnail,
                    };
                    tempData = newData;
                    waitForSetPost();
                });
        };

        fetchPostData();
    }, []);

    const handleSubmit = async () => {
        if (!gun.user().is) {
            console.log("Session expired");
            return;
        }

        const titleIsValid = checkIsValid(title.value, "Title");
        if (!titleIsValid) return;

        const contentIsValid = checkIsValid(content.value, "Content");
        if (!contentIsValid) return;

        if (titleIsValid && contentIsValid) {
            const key = import.meta.env.VITE_GUNKEY;
            const encTitle = await SEA.encrypt(title.value, key);
            const encThumbnail = thumbnail.value
                ? await SEA.encrypt(thumbnail.value, key)
                : "";
            const encContent = await SEA.encrypt(content.value, key);

            const payload = {
                id: postData.id,
                title: encTitle,
                thumbnail: encThumbnail,
                content: encContent,
                author_id: postData.author_id,
                author_name: postData.author_name,
                created: postData.created,
                edited: true,
            };

            gun.get("ik-posts").get(postData.id).put(payload);
            addNotification("Successfully edited post");

            setTimeout(() => {
                navigate("/feed");
            }, 250)
        }
    };

    if (!postData) {
        return (
            <div className="flex min-h-96 items-center justify-center">
                <CircleLoader />
            </div>
        );
    }

    return (
        <div
            className="font-montserrat flex h-fit flex-col"
            style={{ scrollbarGutter: "stable" }}
        >
            <BackButton goHome />
            <p className="mt-4 text-2xl font-bold text-white">Edit Post</p>
            <div className="grid grid-cols-12 gap-x-8">
                <div className="col-span-5 mt-4 flex flex-col">
                    <p className="my-2 font-bold text-white">
                        Thumbnail Image URI
                    </p>
                    <ZenInput
                        type="text"
                        name="post-thumbnail"
                        id="post-thumbnail"
                        onChange={thumbnail.onChange}
                        value={thumbnail.value}
                        placeholder="eg. https://i.imgur.com/08oSWlA.jpeg"
                    />
                    <div className="mt-4 min-h-64 w-full overflow-hidden rounded-2xl border-3 border-zinc-700 bg-zinc-800">
                        {!currImgLoading ? (
                            <img
                                src={previewSrc}
                                alt="ik-curr-image"
                                className="h-auto w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                                <div className="h-4 w-4 animate-spin rounded-full border-4 border-white border-t-transparent" />
                                <p className="animate-pulse font-bold text-white">
                                    Loading
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-7 flex flex-col">
                    <div className="mt-4 flex flex-col">
                        <p className="my-2 font-bold text-white">Title</p>
                        <ZenInput
                            type="text"
                            name="post-title"
                            id="post-title"
                            onChange={title.onChange}
                            value={title.value}
                            placeholder="eg. [Post] Is it Fae-thon or Py-thon?"
                        />
                    </div>
                    <div className="col-span-2 mt-4 flex flex-col">
                        <p className="my-2 font-bold text-white">Content</p>
                        <div className="h-72 rounded-2xl border-3 border-zinc-700 bg-zinc-900">
                            <textarea
                                type="text"
                                name="post-content"
                                id="post-content"
                                onChange={content.onChange}
                                value={content.value}
                                className="h-full w-full resize-none p-4 font-bold text-white outline-none"
                            />
                        </div>
                    </div>
                    <div className="mt-10 flex justify-end rounded-md font-bold">
                        <button
                            onClick={handleSubmit}
                            className="group flex h-10 w-32 items-center justify-between gap-2 rounded-full border border-zinc-800 bg-linear-to-t from-zinc-950 to-zinc-900 px-2 text-white hover:cursor-pointer"
                        >
                            <FaCircleCheck className="hidden text-green-500 group-hover:block" />
                            <FaRegCircleCheck className="block text-green-500 group-hover:hidden" />
                            <span className="text-sm text-white/70 transition ease-in-out group-hover:text-white">
                                Submit
                            </span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditScreen;
