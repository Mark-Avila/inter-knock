import { useEffect, useState } from "react";
import gun from "../gun";
import { useNavigate } from "react-router-dom";
import { ChatProfile, NewPost, PostItem } from "../components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { SEA } from "gun";
import { debounce } from "../utils";

function FeedScreen() {
    const [alias, setAlias] = useState("");
    const [isNewPostScreen, setIsNewPostScreen] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const user = gun.user();
            if (!user.is) {
                navigate("/");
            } else {
                // Get the alias from user profile
                user.get("alias").once((aliasValue) => {
                    setAlias(aliasValue);
                });
            }
        };

        const fetchPosts = async () => {
            const tempPosts = [];
            const waitForSet = debounce(() => {
                setPosts(tempPosts);
            }, 250);

            gun.get("ik-posts")
                .map()
                .once(async (data) => {
                    console.log(data);
                    if (data) {
                        const key = import.meta.env.VITE_GUNKEY;
                        const title = await SEA.decrypt(data.title, key);
                        const thumbnail = await SEA.decrypt(
                            data.thumbnail,
                            key
                        );
                        const content = await SEA.decrypt(data.content, key);
                        const author_name = await SEA.decrypt(
                            data.author_name,
                            key
                        );
                        const created = data.created;
                        const id = data.id;

                        tempPosts.push({
                            id,
                            title,
                            thumbnail,
                            content,
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

    const handleNewPost = () => {
        setIsNewPostScreen((prev) => !prev);
    };

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            gutterBreakpoints={{
                350: "12px",
                750: "16px",
                900: "24px",
            }}
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
                            />
                        )
                )}
            </Masonry>
        </ResponsiveMasonry>
    );
}

export default FeedScreen;
