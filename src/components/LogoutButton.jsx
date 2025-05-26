import { motion } from "motion/react";
import { FaArrowTurnDown } from "react-icons/fa6";

function LogoutButton({ handleLogout }) {

    const variants = {
        hidden: {
            opacity: 0,
            x: -150,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 1.1,
                duration: 0.8,
                type: "spring"
            },
        },
    };

    return ( 
        <motion.div variants={variants} initial="hidden" animate="visible" className="mt-auto flex items-center gap-4">
            <button onClick={handleLogout} className="inset-shadow-dark flex h-8 w-12 items-center justify-center rounded-tl-full rounded-tr-lg rounded-br-full rounded-bl-full border-3 border-red-600 bg-red-600 text-black outline-none hover:cursor-pointer hover:bg-red-800 active:bg-red-900">
                <FaArrowTurnDown className="rotate-90" />
            </button>
            <p className="text-white font-montserrat font-bold  ">Sign out</p>
        </motion.div>
     );
}

export default LogoutButton;