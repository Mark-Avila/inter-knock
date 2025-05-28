import gun from "../gun";
import { useFairy, useInput } from "../hooks";
import globalIcon from "../assets/ik-globe.png";
import AuthInput from "./AuthInput";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import ZenButton from "./ZenButton";
import { useNavigate } from "react-router-dom";

function RegisterForm({ onGoToLogin }) {
    const { addNotification } = useFairy();
    const [isLoading, setIsLoading] = useState(false);
    const username = useInput("");
    const pwd1 = useInput("");
    const pwd2 = useInput("");

    const navigate = useNavigate();

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
                setTimeout(() => {
                    user.auth(username.value, pwd1.value, ({ err }) => {
                        if (!err) {
                            addNotification(
                                "Successfully registered, master",
                            );
                            navigate("/feed");
                        } else {
                            addNotification(err.replace(".", "") + ", master");
                        }
                    });
                }, 500);
            } else {
                addNotification("An error occured while registering, master");
                console.error(err);
            }
            setIsLoading(false);
        });
    };

    return (
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
                    <div className="mt-4 flex justify-center">
                        <ZenButton
                            label="Register"
                            isLoading={isLoading}
                            onClick={handleRegister}
                        />
                    </div>
                    <div className="flex justify-end">
                        <p
                            className={`text-xs ${isLoading ? "text-white/30" : "text-white"}`}
                        >
                            Already have an Account?
                        </p>
                        <button
                            onClick={onGoToLogin}
                            className={`ml-1 text-xs ${isLoading ? "text-white/30 hover:text-white/30" : "text-white hover:cursor-pointer hover:text-green-500"} transition ease-in-out`}
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
