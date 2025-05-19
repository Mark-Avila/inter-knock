import { useFairy, useInput } from "../hooks";
import gun from "../gun";
import { useNavigate } from "react-router-dom";
import globalIcon from "../assets/ik-globe.png";
import AuthInput from "./AuthInput";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { useState } from "react";
import ZenButton from "./ZenButton";

function LoginForm({ onGoToRegister }) {
    const { addNotification } = useFairy();
    
    const [isLoading, setIsLoading] = useState(false);
        
    const username = useInput("");
    const password = useInput("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username.value) {
            addNotification("Username is empty, master");
            return;
        }
        if (!password.value) {
            addNotification("Password is empty, master");
            return;
        }
        const user = gun.user();
        if (user.is) {
            addNotification("User is already loggedin, Master");
            return;
        }

        setIsLoading(true);

        user.auth(username.value, password.value, ({ err }) => {
            if (!err) {
                addNotification("Successfully logged in! Welcome, master");
                navigate("/feed");
            } else {
                addNotification(err.replace(".", "") + ", master");
            }
            setIsLoading(false);
        });
    };

    return (
        <>
            <div className="flex w-96 flex-col items-start gap-1 overflow-hidden rounded-xl border-2 border-zinc-800">
                <div className="flex w-full flex-col items-center justify-center bg-linear-to-t from-zinc-950 to-zinc-900 py-4">
                    <div className="mb-2 h-10 w-10">
                        <img
                            src={globalIcon}
                            alt="ik-globe"
                            className="h-full w-full"
                        />
                    </div>
                    <p className="text-sm text-white">INTER-KNOCK</p>
                </div>
                <div className="flex w-full flex-col bg-[url('./assets/ik-bg-1.jpg')] bg-cover p-8">
                    <div className="flex flex-col gap-4 rounded-2xl bg-zinc-950 p-6">
                        <AuthInput
                            onChange={username.onChange}
                            value={username.value}
                            label="Username"
                            type="text"
                            placeholder="Username"
                            disabled={isLoading}
                        />
                        <AuthInput
                            onChange={password.onChange}
                            value={password.value}
                            label="Password"
                            type="password"
                            placeholder="Password"
                            disabled={isLoading}
                        />
                        <div className="flex justify-end">
                            <p className={`text-xs ${isLoading ? 'text-white/30' : 'text-white'}`}>No Account?</p>
                            <button
                                onClick={onGoToRegister}
                                className={`ml-1 text-xs ${isLoading ? 'text-white/30 hover:text-white/30' : 'text-white hover:text-green-500 hover:cursor-pointer'} transition ease-in-out`}
                                disabled={isLoading}
                            >
                                Register
                            </button>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <ZenButton label="Login" onClick={handleLogin} isLoading={isLoading}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
