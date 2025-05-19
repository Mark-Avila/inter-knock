import { Outlet, useNavigate } from "react-router-dom";
import { ChatProfile, LogoutButton, NavButton } from "../components";
import {
    FaArrowTurnDown,
    FaBackwardFast,
    FaDice,
    FaForwardFast,
    FaPlus,
} from "react-icons/fa6";
import gun from "../gun";
import { useFairy } from "../hooks";
import { motion } from "motion/react";

function PageLayout() {
    const { addNotification } = useFairy();
    const navigate = useNavigate();

    const handleLogout = () => {
        gun.user().leave();   
        navigate('/');
    }


    const buttonVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    }

    return (
        <div className="bg- min-h-screen overflow-auto bg-[url('./assets/ik-bg-2.jpg')] bg-cover p-4">
            <aside className="fixed flex h-[calc(100%-32px)] w-64 flex-col items-start">
                <ChatProfile />
                <motion.div variants={buttonVariants} initial="hidden" animate="visible" className="flex h-full flex-col gap-6">
                    <NavButton text="New Post" icon={<FaPlus />} highlight onClick={() => navigate('/create')}/>
                    <NavButton text="Newest" icon={<FaForwardFast />} />
                    <NavButton text="Oldest" icon={<FaBackwardFast />} />
                    <NavButton text="Random" icon={<FaDice />} />
                    <LogoutButton handleLogout={handleLogout}/>
                </motion.div>
            </aside>
            <div className="mr-12 ml-80 h-full overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default PageLayout;
