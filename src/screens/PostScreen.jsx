import { useNavigate, useParams } from "react-router-dom";
import { BackButton, ChatProfile, CommentItem } from "../components";
import { useEffect, useState } from "react";
import gun from "../gun";
import { debounce, truncateString } from "../utils";
import { SEA } from "gun";
import CommentList from "../components/CommentList";
import { useFairy, useInput, useNav } from "../hooks";
import DiscussImage from "../assets/ik-discuss.webp";
import CircleLoader from "../components/CircleLoader";
import { motion } from "motion/react";
import { FaList, FaPencil } from "react-icons/fa6";

function PostScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addNotification } = useFairy();

    const [postData, setPostData] = useState(null);
    const [commentsData, setCommentsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthor, setIsAuthor] = useState(false);
    const comment = useInput("");
    const { setNavigation } = useNav();

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
        setNavigation([
            { text: "Feed", icon: <FaList />, onClick: () => navigate('/feed') },
        ]);
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            let tempData = null;
            const waitForSetPost = debounce(() => {
                if (tempData) {
                    setPostData(tempData);

                    const user = gun.user();

                    if (tempData.author_id === user.is.pub) {
                        setIsAuthor(true);
                    }

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
                    addNotification("Post not found");
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

                addNotification("Successfully added comment");
            });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options).replace(",", "");
    };

    const goToEdit = () => {
        navigate("/edit/" + id);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-96 items-center justify-center">
                <CircleLoader />
            </div>
        );
    }

    const fadeFromLeftVariants = {
        hidden: {
            x: -50,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "spring",
            },
        },
    };

    const fadeFromRightVariants = {
        hidden: {
            x: 50,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.25,
                type: "spring",
            },
        },
    };

    const profileSrc =
        "https://api.dicebear.com/9.x/dylan/svg?seed=" +
        truncateString(postData.author_id, 5);

    return (
        <div className="flex flex-col overflow-x-hidden">
            <div className="flex w-full items-center justify-between">
                <motion.div
                    variants={fadeFromLeftVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <BackButton goHome />
                </motion.div>
                {isAuthor && (
                    <div className="mt-10 flex justify-end rounded-md font-bold">
                        <button
                            onClick={goToEdit}
                            className="group font-montserrat flex h-10 w-fit items-center gap-4 rounded-full border border-zinc-800 bg-linear-to-t from-zinc-950 to-zinc-900 px-4 text-white hover:cursor-pointer"
                        >
                            <FaPencil className="text-green-500/50 group-hover:text-green-500" />
                            <span className="text-sm text-white/70 transition ease-in-out group-hover:text-white">
                                Edit Post
                            </span>
                            <span></span>
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-8 flex h-full grid-cols-12 gap-8 overflow-x-hidden">
                <div className="w-2/5">
                    <motion.div
                        variants={fadeFromLeftVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-start"
                    >
                        <div className="h-14 w-14 overflow-hidden rounded-full bg-white">
                            <img src={profileSrc} alt="ik-post-author-pic" />
                        </div>
                        <div className="font-montserrat ml-4 font-bold">
                            <p className="text-white">{postData.author_name}</p>
                            <p className="mt-1 text-sm text-white/40">
                                Posted on {formatDate(postData.created)}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeFromLeftVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-4 overflow-hidden rounded-lg border-3 border-zinc-600"
                    >
                        <img
                            src={
                                postData.thumbnail
                                    ? postData.thumbnail
                                    : DiscussImage
                            }
                            alt="post-image"
                            className="h-auto w-full"
                        />
                    </motion.div>
                </div>
                <motion.div
                    variants={fadeFromRightVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-montserrat justspace flex h-fit w-3/5 flex-col bg-black p-4 text-white"
                >
                    <div>
                        <p className="text-xl font-bold">{postData.title}</p>
                        <p className="mt-4 overflow-auto text-sm font-bold whitespace-pre-line text-white/50">
                            {postData.content}
                        </p>
                    </div>
                    <CommentList
                        inputValue={comment.value}
                        onInputChange={comment.onChange}
                        onInputSubmit={handleSendComment}
                        comments={commentsData}
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default PostScreen;
