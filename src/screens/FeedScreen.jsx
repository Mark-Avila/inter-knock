import { useEffect, useState } from "react";
import gun from "../gun";
import { useNavigate } from "react-router-dom";

function FeedScreen() {
    const [alias, setAlias] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const user = gun.user();
            if (!user.is) {
                navigate("/");
            } else {
                // Get the alias from user profile
                user.get('alias').once((aliasValue) => {
                    setAlias(aliasValue);
                });
            }
        }

        checkUser();
    }, [])

    return (  
        <div>
            <h1>This is the feed</h1>
            <h1>Hello there! {alias}</h1>
        </div>
    );
}

export default FeedScreen;