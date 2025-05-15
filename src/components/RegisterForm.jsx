import gun from "../gun";
import { useInput } from "../hooks";
import globalIcon from "../assets/ik-globe.png";
import AuthInput from "./AuthInput";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";

function RegisterForm({ onGoToLogin }) {
    const username = useInput("");
    const pwd1 = useInput("");
    const pwd2 = useInput("");

    const handleRegister = () => {
        if (!username.value) {
            console.log("Username is empty, master");
            return;
        }

        if (!pwd1.value || !pwd2.value) {
            console.log("A password field is empty, master");
            return;
        }

        if (pwd1.value !== pwd2.value) {
            console.log("Passwords don't match, master");
            return;
        }

        const user = gun.user();

        user.create(username.value, pwd1.value, ({ err }) => {
            if (!err) {
                console.log("Successfully registered! Please login, master");

                onGoToLogin();
            } else {
                console.log("An error occured while registering, master");
                console.error(err);
            }
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
                    />
                    <AuthInput
                        onChange={pwd1.onChange}
                        value={pwd1.value}
                        label="Password"
                        type="password"
                        placeholder="Password"
                    />
                    <AuthInput
                        onChange={pwd2.onChange}
                        value={pwd2.value}
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <div className="flex justify-center mt-4">
                        <button
                            className="group bg-linear-to-t hover:cursor-pointer from-zinc-950 to-zinc-900 text-white border border-zinc-800 flex items-center justify-between px-2 gap-2 h-10 w-32 rounded-full"
                            onClick={handleRegister}
                        >
                            <FaCircleCheck className="text-green-500 group-hover:block hidden" />
                            <FaRegCircleCheck className="text-green-500 group-hover:hidden block" />
                            <span className="group-hover:text-white text-white/70 transition ease-in-out text-sm">
                                Register
                            </span>
                            <span></span>
                        </button>
                    </div>
                    <div className="flex justify-end mt-4">
                        <p className="text-white text-xs">Already have an Account?</p>
                        <button
                            onClick={onGoToLogin}
                            className="ml-1 text-xs text-white hover:text-green-500 hover:cursor-pointer transition ease-in-out"
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
