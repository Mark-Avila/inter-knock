import { useEffect, useState } from "react";
import gun from "../gun";
import { useNavigate } from "react-router-dom";
import { PostItem } from "../components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { SEA } from "gun";
import { debounce } from "../utils";
import CircleLoader from "../components/CircleLoader";
import { FaDice, FaForwardFast, FaPlus } from "react-icons/fa6";
import { useNav } from "../hooks";

function FeedScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const { setNavigation } = useNav();
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const user = gun.user();
            if (!user.is) {
                navigate("/");
            }
        };

        const fetchPosts = async () => {
            const tempPosts = [];
            const waitForSet = debounce(() => {
                setPosts(tempPosts);
                setIsLoading(false);
                console.log(tempPosts);
            }, 200);

            gun.get("ik-posts")
                .map()
                .once(async (data) => {
                    if (data) {
                        const key = import.meta.env.VITE_GUNKEY;
                        const title = await SEA.decrypt(data.title, key);
                        const thumbnail = await SEA.decrypt(
                            data.thumbnail,
                            key,
                        );
                        const content = await SEA.decrypt(data.content, key);
                        const author_name = await SEA.decrypt(
                            data.author_name,
                            key,
                        );
                        const created = data.created;
                        const id = data.id;
                        const author_id = data.author_id;

                        tempPosts.push({
                            id,
                            title,
                            thumbnail,
                            content,
                            author_id,
                            author_name,
                            created,
                        });

                        waitForSet();
                    }
                });
        };

        // testFuncClearPosts();
        fetchPosts();
        checkUser();
    }, []);

    const sortPosts = (mode) => {
        // Using current state at the time of call
        setPosts((prevPosts) => {
            const current = [...prevPosts];

            let sorted = current;

            if (mode === "oldest") {
                sorted = current.sort((a, b) => a.created - b.created);
            } else if (mode === "random") {
                sorted = current.sort(() => Math.random() - 0.5);
            } else {
                sorted = current.sort((a, b) => b.created - a.created);
            }

            console.log(sorted)

            return sorted
        });
    };

    useEffect(() => {
        setNavigation([
            { text: "New Post", icon: <FaPlus />, onClick: () => navigate('/create'), highlight: true },
            { text: "Latest", icon: <FaForwardFast />, onClick: () => sortPosts("latest") },
            { text: "Oldest", icon: <FaForwardFast />, onClick: () => sortPosts("oldest") },
            { text: "Random", icon: <FaDice />, onClick: () => sortPosts("random") },
        ]);
    }, []);


    if (isLoading) {
        return (
            <div className="flex min-h-96 items-center justify-center">
                <CircleLoader />
            </div>
        );
    }

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
            gutterBreakpoints={{
                350: "12px",
                750: "16px",
                900: "24px",
            }}
            className="overflow-hidden"
        >
            <Masonry>
                {posts.map(
                    (item) =>
                        item.id && (
                            <PostItem
                                id={item.id}
                                name={item.author_name}
                                title={item.title}
                                content={item.content}
                                thumbnail={item.thumbnail}
                                created={item.created}
                                author_id={item.author_id}
                            />
                        ),
                )}
            </Masonry>
        </ResponsiveMasonry>
    );
}

export default FeedScreen;
