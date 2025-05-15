import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function BackButton({ goHome }) {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(goHome ? '/feed' : -1);
    };

    return ( 
        <div className="my-4">
            <button
                className="font-montserrat text-white hover:cursor-pointer text-sm font-bold flex items-center gap-4"
                onClick={onBackClick}
            >
                <FaArrowLeft />
                Go Back
            </button>
        </div>
     );
}

export default BackButton;