import { SEA } from "gun";
import { useInput } from "../hooks";
import gun from "../gun";
import { useEffect } from "react";

function NewPost({ onBackClick }) {
    const title = useInput("");
    // Test: https://cdn.pixabay.com/photo/2021/12/12/20/00/play-6865967_640.jpg
    const thumbnail = useInput("");
    const content = useInput("");

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
            // Get the alias from user profile
            gun.user()
                .get("alias")
                .once(async (alias) => {
                    const key = import.meta.env.VITE_GUNKEY;
                    const timestamp = Date.now();
                    const postId = "IK-" + String(timestamp);
                    const encTitle = await SEA.encrypt(title.value, key);
                    const author_id = String(gun.user().is.pub);
                    const author_name = alias;
                    const encThumbnail = thumbnail.value
                        ? await SEA.encrypt(thumbnail.value, key)
                        : "";
                    const encContent = await SEA.encrypt(content.value, key);

                    const payload = {
                        id: postId,
                        title: encTitle,
                        thumbnail: encThumbnail,
                        content: encContent,
                        author_id: author_id,
                        author_name: author_name,
                        created: timestamp,
                    };

                    gun.get("ik-posts").get(postId).put(payload);

                    console.log("Successfully added post");
                });
        }
    };

    const checkIsValid = (value, field) => {
        if (!value || value.length === 0) {
            console.log(field + " is empty");
            return false;
        }
        if (value.length < 2) {
            console.log(field + " is short");
            return false;
        }
        return true;
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
                <p className="text-2xl text-white mt-4">New Post</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <div className="mt-4 flex flex-col">
                    <p className="text-white my-2">Title</p>
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
                    <p className="text-white my-2">Thumbnail Image URI</p>
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
                    <p className="text-white my-2">Content</p>
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

export default NewPost;
