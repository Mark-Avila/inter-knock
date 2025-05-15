import { useNavigate, useParams } from "react-router-dom";
import { BackButton, ChatProfile, CommentItem } from "../components";
import { useEffect, useState } from "react";
import gun from "../gun";
import { debounce } from "../utils";
import { SEA } from "gun";
import CommentList from "../components/CommentList";
import { useInput } from "../hooks";
import DiscussImage from "../assets/ik-discuss.webp";
import CircleLoader from "../components/CircleLoader";

function PostScreen() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [postData, setPostData] = useState(null);
    const [commentsData, setCommentsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const comment = useInput("");

    useEffect(() => {
        const checkUser = () => {
            const user = gun.user();
            if (!user.is) {
                navigate("/");
            }
        };

        checkUser();
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            let tempData = null;
            const waitForSetPost = debounce(() => {
                if (tempData) {
                    setPostData(tempData);
                    setIsLoading(false);
                } else {
                    navigate("/feed");
                }
            }, 500);
            gun.get("ik-posts")
                .get(id)
                .once(async (data) => {
                    if (data) {
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
                        author_name = await SEA.decrypt(author_name, secret);
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
                    }
                    waitForSetPost();
                });
        };

        fetchPost();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            let tempData = [];
            const waitForSetComments = debounce(() => {
                if (tempData) {
                    setCommentsData(tempData);
                } else {
                    console.log("Post not found");
                    navigate("/feed");
                }
            }, 500);

            gun.get("ik-comments")
                .get(id)
                .map()
                .once(async (data) => {
                    if (data) {
                        const secret = import.meta.env.VITE_GUNKEY;

                        let { id, author_id, author_name, text, created } =
                            data;

                        author_name = await SEA.decrypt(author_name, secret);
                        text = await SEA.decrypt(text, secret);

                        let newData = {
                            id,
                            author_id,
                            author_name,
                            text,
                            created,
                        };

                        tempData.push(newData);
                    }
                    waitForSetComments();
                });
        };

        fetchComments();
    }, []);

    const handleSendComment = () => {
        if (!comment.value) {
            console.log("No comment text");
            return;
        }

        gun.user()
            .get("alias")
            .once(async (alias) => {
                const secret = import.meta.env.VITE_GUNKEY;
                const authorId = gun.user().is.pub;
                const timestamp = Date.now();
                const commentId = "IKC-" + timestamp;

                const data = {
                    id: commentId,
                    author_id: authorId,
                    author_name: await SEA.encrypt(alias, secret),
                    text: await SEA.encrypt(comment.value, secret),
                    created: timestamp,
                };

                gun.get("ik-comments").get(id).get(commentId).put(data);

                console.log("Successfully added comment");
            });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options).replace(",", "");
    };

    if (isLoading) {
        return (
            <div className="min-h-96 flex items-center justify-center">
                <CircleLoader />
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <BackButton goHome/>
            <div className="grid h-full mt-8 grid-cols-12 gap-8 overflow-auto">
                <div className="col-span-5">
                    <div>
                        <div className="flex items-start">
                            <div className="h-14 w-14 rounded-full bg-white"></div>
                            <div className="font-montserrat ml-4 font-bold">
                                <p className="text-white">
                                    {postData.author_name}
                                </p>
                                <p className="mt-1 text-xs text-white/40">
                                    {formatDate(postData.created)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 overflow-hidden rounded-lg border-3 border-zinc-600">
                        <img
                            src={
                                postData.thumbnail
                                    ? postData.thumbnail
                                    : DiscussImage
                            }
                            alt="post-image"
                            className="h-auto w-full"
                        />
                    </div>
                </div>
                <div className="font-montserrat col-span-7 flex flex-col bg-black p-4 text-white">
                    <div>
                        <p className="text-xl font-bold">{postData.title}</p>
                        <p className="mt-4 max-h-64 overflow-auto text-sm font-bold text-white/50">
                            {postData.content}
                        </p>
                    </div>
                    <CommentList
                        inputValue={comment.value}
                        onInputChange={comment.onChange}
                        onInputSubmit={handleSendComment}
                        comments={commentsData}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostScreen;
