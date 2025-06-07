import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiscussImage from "../assets/ik-discuss.webp";
import { motion } from "motion/react";
import { truncateString } from "../utils";

function PostItem({ id, title, thumbnail, content, name, created, author_id }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(thumbnail);

    useEffect(() => {
        setImgSrc(thumbnail);
        setIsLoading(true); // Optional: Reset loading state on new thumbnail
    }, [thumbnail]);


    const handlePostItemClick = () => {
        navigate("/post/" + id);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setImgSrc(DiscussImage);
        setIsLoading(false);
    };

    const postDate = new Date(created).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    const variants = {
        hidden: {
            opacity: 0,
            y: 25,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                
            }
        },
    }
    
    const profileSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=" + truncateString(author_id, 5)

    return (
        <div
            className="flex flex-col overflow-hidden rounded-2xl border-3 border-black bg-zinc-800 hover:bg-zinc-900 transition ease-in group hover:cursor-pointer"
            onClick={handlePostItemClick}
        >
            <div className="relative flex flex-col group-hover:brightness-75 transition ease-in">
                {isLoading && (
                    <div className="flex min-h-64 flex-col gap-4 items-center justify-center h-full w-full">
                        <div className="h-4 w-4 animate-spin rounded-full border-4 border-white border-t-transparent" />
                        <p className="text-white font-bold animate-pulse">Loading</p>
                    </div>
                )}
                <img
                    src={imgSrc ? imgSrc : DiscussImage}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={`h-full w-full object-cover ${isLoading ? 'hidden opacity-0' : 'opacity-100'}`}
                    alt="post-thumbnail"
                />
                <p className="font-montserrat absolute bottom-0 left-0 z-40 -mr-8 ml-14 w-fit rounded-tr-full bg-zinc-900 pt-1 pr-6 pl-8 text-sm font-bold text-white">
                    {name}
                </p>
            </div>
            <div className="ml-4 flex pb-0">
                <div className="z-50 -mt-8 h-16 w-16 rounded-full border-4 border-zinc-800 bg-white overflow-hidden">
                    <img src={profileSrc} alt="ik-post-profile" />
                </div>
                <div className="font-montserrat mt-2 ml-2 font-bold">
                    <p className="text-xs text-white">{postDate}</p>
                </div>
            </div>
            <div className="font-montserrat mt-4 flex flex-col p-6 pt-0">
                <p className="font-bold text-white">{title}</p>
                <p className="mt-2 text-sm font-bold wrap-break-word text-white/60 whitespace-pre-line">
                    {content ? truncateString(content, 150) : ""}
                </p>
            </div>
        </div>
    );
}

export default PostItem;
