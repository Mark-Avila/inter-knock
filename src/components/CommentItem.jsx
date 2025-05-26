import { truncateString } from "../utils";

function CommentItem({ name, comment, author_id }) {

    const profileSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=" + truncateString(author_id, 5)

    return (
        <div className="flex items-start font-montserrat font-bold border-b-2 border-white/10 pb-4 mt-4 last:border-none">
            <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden border-double border-2 border-white bg-white mr-4 ">
                <img src={profileSrc} alt="sk-comment-profile-pic" />
            </div>
            <div className="flex flex-col">
                <p>{name ? name : '...'}</p>
                <p className="mt-1 text-white/50 text-sm">
                    {comment ? comment : '....'}
                </p>
            </div>
        </div>
    );
}

export default CommentItem;
