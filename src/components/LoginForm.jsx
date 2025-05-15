import { useInput } from "../hooks";
import gun from "../gun";
import { useNavigate } from "react-router-dom";
import globalIcon from "../assets/ik-globe.png";
import AuthInput from "./AuthInput";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

function LoginForm({ onGoToRegister }) {
    const username = useInput("");
    const password = useInput("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username.value) {
            console.log("Username is empty, master");
            return;
        }
        if (!password.value) {
            console.log("Password is empty, master");
            return;
        }
        const user = gun.user();
        if (user.is) {
            console.log(user.is)
            console.log("User is already loggedin, Master");
            return;
        }
        user.auth(username.value, password.value, ({ err }) => {
            if (!err) {
                console.log("Successfully logged in! Welcome, master");
                navigate('/feed')
            } else {
                console.error(err.replace(".", "") + ", master");
            }
        });
    };

    return (
        <>
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
                            onChange={password.onChange}
                            value={password.value}
                            label="Password"
                            type="password"
                            placeholder="Password"
                        />
                        <div className="flex justify-end ">
                            <p className="text-white text-xs">No Account?</p>
                            <button onClick={onGoToRegister} className="ml-1 text-xs text-white hover:text-green-500 hover:cursor-pointer transition ease-in-out">Register</button>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button className="group bg-linear-to-t hover:cursor-pointer from-zinc-950 to-zinc-900 text-white border border-zinc-800 flex items-center justify-between px-2 gap-2 h-10 w-32 rounded-full" onClick={handleLogin}>
                                <FaCircleCheck className="text-green-500 group-hover:block hidden"/>
                                <FaRegCheckCircle className="text-green-500 group-hover:hidden block" />
                                <span className="group-hover:text-white text-white/70 transition ease-in-out text-sm">Login</span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
