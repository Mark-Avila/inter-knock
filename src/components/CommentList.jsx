import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

function CommentList({ comments, inputValue, onInputChange, onInputSubmit }) {
    return (
        <div className="mt-4 flex h-full flex-col">
            <div className="flex grow basis-0 flex-col overflow-auto">
                {comments &&
                    comments.map((item) => (
                        <CommentItem
                            key={item.id}
                            comment={item.text}
                            name={item.author_name}
                        />
                    ))}
            </div>
            <CommentInput
                inputValue={inputValue}
                onInputChange={onInputChange}
                onInputSubmit={onInputSubmit}
            />
        </div>
    );
}

export default CommentList;
