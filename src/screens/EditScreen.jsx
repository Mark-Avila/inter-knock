import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gun from "../gun";
import { checkIsValid, debounce } from "../utils";
import { useInput } from "../hooks";
import { SEA } from "gun";

function EditScreen() {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const title = useInput("");
    const thumbnail = useInput("");
    const content = useInput("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = () => {
            let tempData = null;
            const waitForSetPost = debounce(() => {
                if (tempData) {
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
                    thumbnail = await SEA.decrypt(thumbnail, secret);
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
            };

            gun.get("ik-posts").get(postData.id).put(payload);

            console.log("Successfully added post");
        }
    };

    if (!postData) {
        return (
            <div className="min-h-screen bg-zinc-900 p-4">
                <p className="text-white">Loading</p>
            </div>
        );
    }

    const onBackClick = () => {
        navigate('/feed');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-32px)]">
            <div>
                <button
                    className="text-white hover:cursor-pointer"
                    onClick={onBackClick}
                >
                    {"< Go Back"}
                </button>
                <p className="text-2xl text-white mt-4">Edit Post</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <div className="mt-4 flex flex-col">
                    <p className="text-white my-2">New Title</p>
                    <div className="bg-white h-8">
                        <input
                            type="text"
                            name="post-title"
                            id="post-title"
                            onChange={title.onChange}
                            value={title.value}
                            className="w-full h-full"
                        />
                    </div>
                </div>
                <div className="mt-4 flex flex-col">
                    <p className="text-white my-2">New Thumbnail Image URI</p>
                    <div className="bg-white h-8">
                        <input
                            type="text"
                            name="post-thumbnail"
                            id="post-thumbnail"
                            onChange={thumbnail.onChange}
                            value={thumbnail.value}
                            className="w-full h-full"
                        />
                    </div>
                </div>
                <div className="mt-4 flex flex-col col-span-2">
                    <p className="text-white my-2">New Content</p>
                    <div className="bg-white h-72 resize-none">
                        <textarea
                            type="text"
                            name="post-content"
                            id="post-content"
                            onChange={content.onChange}
                            value={content.value}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <button className="bg-green-500 p-2" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default EditScreen;
