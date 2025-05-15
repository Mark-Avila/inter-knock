import { FaPaperPlane } from "react-icons/fa";

function CommentInput({ inputValue, onInputChange, onInputSubmit }) {
    return (
        <div className="flex h-12 gap-4">
            <div className="mt-auto h-full w-full rounded-full border-2 border-zinc-800 bg-zinc-900">
                <input
                    type="text"
                    name="comment-text"
                    id="comment-text"
                    value={inputValue}
                    onChange={onInputChange}
                    className="font-montserrat h-full w-full px-4 text-sm font-bold text-white outline-none"
                />
            </div>
            <button
                onClick={onInputSubmit}
                className="text-white hover:text-green-500 text-2xl px-4 hover:cursor-pointer active:text-green-800"
            >
                <FaPaperPlane />
            </button>
        </div>
    );
}

export default CommentInput;
