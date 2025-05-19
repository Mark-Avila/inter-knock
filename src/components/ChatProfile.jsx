import { useEffect, useState } from "react";
import gun from "../gun";
import { FaRegClipboard } from "react-icons/fa6";
import { truncateString } from "../utils";
import { motion } from "motion/react";

function ChatProfile() {
    const [userAlias, setUserAlias] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchAlias = () => {
            const user = gun.user();
            user.get("alias").once(async (alias) => {
                setUserAlias(alias);
                setUserId(user.is.pub);
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
                type: "spring"
            },
        },
    };

    return (
        <motion.div variants={variants} initial="hidden" animate="visible" className="flex w-full gap-2 rounded-full border-3 border-black p-2 pr-8 bg-gradient-to-b from-zinc-800 to-zinc-900">
            <div className="h-12 w-12 rounded-full bg-white border-3 border-black"></div>
            <div className="flex h-full flex-col justify-evenly font-montserrat font-bold">
                <p className="text-white">{truncateString(userAlias, 50)}</p>
                <div className="text-white/50">
                    <button className="flex items-center gap-2 hover:cursor-pointer">
                        <FaRegClipboard />
                        <p className="text-xs">#{truncateString(userId, 5)}</p>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default ChatProfile;
