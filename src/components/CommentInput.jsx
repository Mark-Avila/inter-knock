import { FaAlignRight, FaPaperPlane } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

function CommentInput({ inputValue, onInputChange, onInputSubmit }) {
    return (
        <div className="flex h-12 gap-4 mt-auto">
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
                className="group font-montserrat flex h-full w-fit items-center gap-4 rounded-full border border-zinc-800 bg-linear-to-t from-zinc-950 to-zinc-900 px-4 text-white hover:cursor-pointer"
            >
                <FaAngleRight className="text-green-500/50 group-hover:text-green-500" />
                <span className="text-sm font-bold text-white/70 transition ease-in-out group-hover:text-white">
                    Comment
                </span>
                <span></span>
            </button>
        </div>
    );
}

export default CommentInput;
