import { useEffect, useState } from "react";
import gun from "../gun";
import { LoginForm, RegisterForm } from "../components";
import { useNavigate } from "react-router-dom";

function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = gun.user();
        
        if (user.is) {
            navigate('/feed');
        }
    }, []);

    const toggleAuthMode = () => setIsLogin(prev => !prev);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 font-montserrat font-bold">
            {isLogin ? (
                <LoginForm onGoToRegister={toggleAuthMode} />
            ) : (
                <RegisterForm onGoToLogin={toggleAuthMode} />
            )}
        </div>
    );
}

export default AuthScreen;
