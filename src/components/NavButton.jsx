import { motion } from "motion/react";

function NavButton({ icon, text, highlight, onClick }) {
    const variants = {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring'
            },
        },
    };


    if (highlight) {
        return (
            <motion.div variants={variants}>
                <button
                    onClick={onClick}
                    className="font-montserrat mt-8 flex items-center gap-4 rounded-tl-full rounded-tr-lg hover:cursor-pointer rounded-br-full rounded-bl-full border-3 border-black bg-gradient-to-r from-green-500 to-lime-500 px-4 py-2 font-bold text-black hover:from-green-600 hover:to-lime-600 transition ease-in-out"
                >
                    {icon ? icon : ""}
                    {text}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div variants={variants}>
            <button
                className="font-montserrat flex w-fit items-center gap-3 rounded-full border-3 border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-400 transition ease-in-out hover:cursor-pointer hover:border-zinc-600 hover:text-zinc-50 active:text-zinc-500"
            >
                {icon ? icon : ""}
                {text}
            </button>
        </motion.div>

    );
}

export default NavButton;
