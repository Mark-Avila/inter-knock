function CommentItem({ name, comment }) {
    return (
        <div className="flex items-start border-b-2 border-white pb-4 mt-4 last:border-none">
            <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-white mr-4"></div>
            <div className="flex flex-col">
                <p>{name ? name : '...'}</p>
                <p className="mt-1">
                    {comment ? comment : '....'}
                </p>
            </div>
        </div>
    );
}

export default CommentItem;
