import { Outlet, useNavigate } from "react-router-dom";
import { ChatProfile } from "../components";

function PageLayout() {

    const navigate = useNavigate();

    const goTo = (path) => {
        navigate(path);
    }

    return (
        <div className="min-h-screen bg-zinc-900 p-4">
            <aside className="border h-[calc(100%-32px)] border-white w-64 fixed flex flex-col items-start">
                <ChatProfile />
                <button onClick={() => goTo('/create')} className="text-white mt-8 hover:bg-green-500 border-2 border-green-500 p-2">
                    New Post
                </button>
                <button className="text-white mt-8 hover:bg-green-500 border-2 border-green-500 p-2">
                    Popular
                </button>
                <button className="text-white mt-8 hover:bg-green-500 border-2 border-green-500 p-2">
                    Newest
                </button>
                <button className="text-white mt-8 hover:bg-green-500 border-2 border-green-500 p-2">
                    Random
                </button>
                <button className="text-white border-2 border-red-500 hover:bg-red-500 p-2 mt-auto">
                    Logout
                </button>
            </aside>
            <div className="ml-80 mr-12 overflow-auto h-full">
                <Outlet />
            </div>
        </div>
    );
}

export default PageLayout;
