import gun from "../gun";
import { useFairy, useInput } from "../hooks";
import globalIcon from "../assets/ik-globe.png";
import AuthInput from "./AuthInput";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import ZenButton from "./ZenButton";

function RegisterForm({ onGoToLogin }) {
    const { addNotification } = useFairy();
    const [isLoading, setIsLoading] = useState(false);
    const username = useInput("");
    const pwd1 = useInput("");
    const pwd2 = useInput("");

    const handleRegister = () => {
        if (!username.value) {
            addNotification("Username is empty, master");
            return;
        }

        if (!pwd1.value || !pwd2.value) {
            addNotification("A password field is empty, master");
            return;
        }

        if (pwd1.value !== pwd2.value) {
            addNotification("Passwords don't match, master");
            return;
        }

        const user = gun.user();

        setIsLoading(true);

        user.create(username.value, pwd1.value, ({ err }) => {
            if (!err) {
                addNotification("Successfully registered! Please login, master");
                onGoToLogin();
            } else {
                addNotification("An error occured while registering, master");
                console.error(err);
            }
            setIsLoading(false)
        });
    };

    return (
        <div className="flex flex-col items-start gap-1 rounded-xl overflow-hidden w-96 border-2 border-zinc-800">
            <div className="flex flex-col items-center justify-center w-full bg-linear-to-t from-zinc-950 to-zinc-900 py-4">
                <div className="w-10 h-10 mb-2">
                    <img
                        src={globalIcon}
                        alt="ik-globe"
                        className="w-full h-full"
                    />
                </div>
                <p className="text-white text-sm">INTER-KNOCK</p>
            </div>
            <div className="bg-[url('./assets/ik-bg-1.jpg')] bg-cover flex flex-col p-8 w-full">
                <div className="flex flex-col bg-zinc-950 p-6 rounded-2xl gap-4">
                    <AuthInput
                        onChange={username.onChange}
                        value={username.value}
                        label="Username"
                        type="text"
                        placeholder="Username"
                        disabled={isLoading}
                    />
                    <AuthInput
                        onChange={pwd1.onChange}
                        value={pwd1.value}
                        label="Password"
                        type="password"
                        placeholder="Password"
                        disabled={isLoading}
                    />
                    <AuthInput
                        onChange={pwd2.onChange}
                        value={pwd2.value}
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        disabled={isLoading}
                    />
                    <div className="flex justify-center mt-4">
                        <ZenButton label="Register" isLoading={isLoading} onClick={handleRegister}/>
                    </div>
                    <div className="flex justify-end">
                        <p className={`text-xs ${isLoading ? 'text-white/30' : 'text-white'}`}>Already have an Account?</p>
                        <button
                            onClick={onGoToLogin}
                            className={`ml-1 text-xs ${isLoading ? 'text-white/30 hover:text-white/30' : 'text-white hover:text-green-500 hover:cursor-pointer'} transition ease-in-out`}
                            disabled={isLoading}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
