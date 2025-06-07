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
import { useFairy, useNav } from "../hooks";
import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";

function PageLayout() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { navItems } = useNav(); 
    const controls = useAnimation();

    useEffect(() => {
        if (navItems.length > 0) {
            controls.start('visible')
        }
    }, [navItems])

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
        <div className="min-h-screen overflow-hidden bg-[url('./assets/ik-bg-2.jpg')] bg-fixed bg-cover p-4">
            <aside className="fixed flex h-[calc(100%-32px)] w-64 flex-col items-start">
                <ChatProfile />
                <motion.div variants={buttonVariants} initial="hidden" animate={controls} className="flex h-full flex-col mt-8 gap-6">
                    {navItems.map((item, index) => (
                        <NavButton key={item.text + index} text={item.text} icon={item.icon} onClick={item.onClick} highlight={item.highlight}/>
                    ))}
                    <LogoutButton handleLogout={handleLogout}/>
                </motion.div>
            </aside>
            <div className="mr-2 ml-80 h-auto overflow-visible" style={{ scrollbarGutter: 'stable' }}>
                <Outlet />
            </div>
        </div>
    );
}

export default PageLayout;
