import CommentItem from "./CommentItem";

function CommentList({ comments, inputValue, onInputChange, onInputSubmit }) {
    return (
        <div className="mt-4 flex flex-col h-full">
            <div className="flex flex-col basis-0 grow overflow-auto">
                {comments && comments.map((item) => (
                    <CommentItem key={item.id} comment={item.text} name={item.author_name}/>
                ))}
            </div>
            <div className="flex h-12">
                <div className="bg-white mt-auto w-full h-full">
                    <input
                        type="text"
                        name="comment-text"
                        id="comment-text"
                        value={inputValue}
                        onChange={onInputChange}
                        className="text-black w-full h-full"
                    />
                </div>
                <button onClick={onInputSubmit} className="bg-green-500 px-4 hover:bg-green-700 active:bg-green-800 hover:cursor-pointer">Send</button>
            </div>
        </div>
    );
}

export default CommentList;
