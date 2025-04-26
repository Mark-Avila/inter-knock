import { useNavigate, useParams } from "react-router-dom";
import { ChatProfile, CommentItem } from "../components";
import { useEffect, useState } from "react";
import gun from "../gun";
import { debounce } from "../utils";
import { SEA } from "gun";
import CommentList from "../components/CommentList";
import { useInput } from "../hooks";

function PostScreen() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [postData, setPostData] = useState(null);
    const [commentsData, setCommentsData] = useState(null);
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
                } else {
                    console.log("Post not found");
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

                        tempData.push(newData)
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

                gun.get('ik-comments').get(id).get(commentId).put(data);

                console.log("Successfully added comment")
            });
    };

    if (!postData) {
        return (
            <div className="min-h-screen bg-zinc-900 p-4">
                <p className="text-white">Loading</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 overflow-auto h-full gap-8">
            <div>
                <div>
                    <div className="flex items-start">
                        <div className="w-14 h-14 bg-white rounded-full"></div>
                        <div className="text-white ml-4">
                            <p>{postData.author_name}</p>
                            <p>{postData.created}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <img src={postData.thumbnail} alt="post-image" />
                </div>
            </div>
            <div className="bg-black text-white p-4 flex flex-col">
                <div className="">
                    <p className="font-bold text-xl">{postData.title}</p>
                    <p className="text-white/50 mt-4 max-h-64 overflow-auto">
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
    );
}

export default PostScreen;
