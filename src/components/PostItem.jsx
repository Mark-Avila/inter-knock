import { useNavigate } from "react-router-dom";

function PostItem({ id, title, thumbnail, content, name, created }) {
    const navigate = useNavigate();

    const handlePostItemClick = () => {
        navigate('/post/' + id);
    }

    return (
        <div className="flex flex-col rounded-2xl overflow-hidden border border-white hover:cursor-pointer" onClick={handlePostItemClick}>
            <div> 
                <img
                    src={thumbnail}
                    className="w-full h-full object-cover"
                    alt="test-img"
                />
            </div>
            <div className="flex p-4 pb-0">
                <div className="w-14 h-14 bg-white rounded-full"></div>
                <div className="flex flex-col h-full justify-evenly ml-2">
                    <p className="text-white">{name}</p>
                    <p className="text-white text-sm">{created}</p>
                </div>
            </div>
            <div className="flex flex-col mt-4 p-4 pt-0">
                <p className="font-bold text-white">
                    {title}
                </p>
                <p className="text-white wrap-break-word">
                    {content}
                </p>
            </div>
        </div>
    );
}

export default PostItem;
