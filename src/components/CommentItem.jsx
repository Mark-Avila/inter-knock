function CommentItem({ name, comment }) {
    return (
        <div className="flex items-start font-montserrat font-bold border-b-2 border-white/10 pb-4 mt-4 last:border-none">
            <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden border-double border-2 border-white bg-white mr-4 "></div>
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
