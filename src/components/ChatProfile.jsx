import { useEffect, useState } from "react";
import gun from "../gun";
import { FaRegClipboard } from "react-icons/fa6";
import { truncateString } from "../utils";
import { motion } from "motion/react";
import { div } from "motion/react-client";

function ChatProfile() {
    const [isLoading, setIsLoading] = useState(true);
    const [userAlias, setUserAlias] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchAlias = () => {
            const user = gun.user();
            user.get("alias").once(async (alias) => {
                setUserAlias(alias);
                setUserId(user.is.pub);
                setIsLoading(false);
            });
        };

        fetchAlias();
    }, []);

    const variants = {
        hidden: {
            opacity: 0,
            x: -150,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                type: "spring",
            },
        },
    };

    const imgSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=" + truncateString(userId, 5)

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="flex w-full gap-2 rounded-full border-3 border-black bg-gradient-to-b from-zinc-800 to-zinc-900 p-2 pr-8"
        >
            <div className="h-12 w-12 rounded-full border-3 border-black bg-zinc-700 overflow-hidden">
                <img src={imgSrc} alt="ik-profile-img"></img>
            </div>
            <div className="font-montserrat flex h-full flex-col justify-evenly font-bold">
                {isLoading ? (
                    <div className="h-4 w-24 animate-pulse rounded-sm bg-zinc-700"></div>
                ) : (
                    <p className="text-white">
                        {truncateString(userAlias, 10)}
                    </p>
                )}
                <div className="text-white/50">
                    {isLoading ? (
                        <div className="h-4 w-16 animate-pulse rounded-sm bg-zinc-700"></div>
                    ) : (
                        <button className="flex items-center gap-2 hover:cursor-pointer">
                            <FaRegClipboard />
                            <p className="text-xs">
                                #{truncateString(userId, 5)}
                            </p>
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default ChatProfile;
