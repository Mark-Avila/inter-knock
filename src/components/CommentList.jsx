import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

function CommentList({ comments, inputValue, onInputChange, onInputSubmit }) {

    return (
        <div className="mt-4 flex flex-col shrink-0">
            <div className="flex mb-4 flex-col overflow-auto">
                {comments &&
                    comments.map((item) => (
                        <CommentItem
                            key={item.id}
                            comment={item.text}
                            name={item.author_name}
                            author_id={item.author_id}
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
