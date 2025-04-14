import { useState } from "react";
import { useInput } from "../hooks";
import gun from "../gun";
import { useNavigate } from "react-router-dom";

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
            <div className="flex flex-col items-start border border-black p-2 gap-1">
                <p>Login User</p>
                <input
                    type="text"
                    id="username"
                    className="border border-black"
                    value={username.value}
                    onChange={username.onChange}
                />
                <input
                    type="password"
                    id="password"
                    className="border border-black"
                    value={password.value}
                    onChange={password.onChange}
                />
                <button className="bg-blue-400" onClick={handleLogin}>
                    Login
                </button>
            </div>
            <button onClick={onGoToRegister}>Go to Register</button>
        </>
    );
}

export default LoginForm;
