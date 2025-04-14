import gun from "../gun";
import { useInput } from "../hooks";

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
                console.log(
                    "Successfully registered! Please login, master"
                );

                onGoToLogin();
            } else {
                console.log(
                    "An error occured while registering, master"
                );
                console.error(err);
            }
        });
    };

    return (
        <>
            <div className="flex flex-col items-start border border-black p-2 gap-1">
                <p>Register User</p>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="border border-black"
                    value={username.value}
                    onChange={username.onChange}
                />
                <input
                    type="password"
                    name="password-1"
                    id="password-1"
                    className="border border-black"
                    value={pwd1.value}
                    onChange={pwd1.onChange}
                />
                <input
                    type="password"
                    name="password-2"
                    id="password-2"
                    className="border border-black"
                    value={pwd2.value}
                    onChange={pwd2.onChange}
                />
                <button className="bg-blue-400" onClick={handleRegister}>Register</button>
            </div>
            <button onClick={onGoToLogin}>Go to Login</button>
        </>
    );
}

export default RegisterForm;
