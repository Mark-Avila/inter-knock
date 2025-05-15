import { Outlet, useNavigate } from "react-router-dom";
import { ChatProfile, NavButton } from "../components";
import {
    FaArrowTurnDown,
    FaBackwardFast,
    FaDice,
    FaForwardFast,
} from "react-icons/fa6";
import gun from "../gun";
import { useFairy } from "../hooks";

function PageLayout() {
    const { addNotification } = useFairy();
    const navigate = useNavigate();

    const handleLogout = () => {
        gun.user().leave();   
        navigate('/');
    }

    const goTo = (path) => {
        navigate(path);
    };

    return (
        <div className="bg- min-h-screen overflow-auto bg-[url('./assets/ik-bg-2.jpg')] bg-cover p-4">
            <aside className="fixed flex h-[calc(100%-32px)] w-64 flex-col items-start">
                <ChatProfile />
                <div className="flex h-full flex-col gap-6">
                    <button
                        onClick={() => goTo("/create")}
                        className="font-montserrat mt-8 rounded-tl-full rounded-tr-lg rounded-br-full rounded-bl-full border-3 border-black bg-gradient-to-r from-green-500 to-lime-500 px-8 py-2 font-bold text-black hover:bg-green-500"
                    >
                        New Post
                    </button>
                    <button className="bg-blue-600" onClick={() => addNotification('Test')}>Notif</button>
                    <NavButton text="Newest" icon={<FaForwardFast />} />
                    <NavButton text="Oldest" icon={<FaBackwardFast />} />
                    <NavButton text="Random" icon={<FaDice />} />
                    <div className="mt-auto flex items-center gap-4">
                        <button onClick={handleLogout} className="inset-shadow-dark flex h-8 w-12 items-center justify-center rounded-tl-full rounded-tr-lg rounded-br-full rounded-bl-full border-3 border-red-600 bg-red-600 text-black outline-none hover:cursor-pointer hover:bg-red-800 active:bg-red-900">
                            <FaArrowTurnDown className="rotate-90" />
                        </button>
                        <p className="text-white">Sign out</p>
                    </div>
                </div>
            </aside>
            <div className="mr-12 ml-80 h-full overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default PageLayout;
