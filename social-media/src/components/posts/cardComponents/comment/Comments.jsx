import { useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import UserComponent from "../UserComponent";
import CommentBody from "./CommentBody";
import CommentForm from "./CommentForm";
function Comments({ comments, setComments }) {
  const [replying, setReplying] = useState(false);
  const [replyId, setReplyId] = useState("");
  const [commentToReplyTo, setCommentToReplyTo] = useState(null);

  // Scrolls up to the comment form when clicking reply.
  const scrollRef = useRef(null);

  function scrollToElement() {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    const elementTop = scrollRef.current.getBoundingClientRect().top;
    const windowCenter = window.innerHeight / 2;
    const scrollTo = elementTop - windowCenter + window.pageYOffset;
    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  }

  return (
    <>
      <CommentForm
        comments={comments}
        setComments={setComments}
        replying={replying}
        setCommentToReplyTo={setCommentToReplyTo}
        setReplying={setReplying}
        replyId={replyId}
        commentToReplyTo={commentToReplyTo}
        referance={scrollRef}
      />
      <div>
        {comments &&
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <UserComponent data={comment} />
              {comments && <CommentBody comments={comments} comment={comment} />}
              <Button
                value={comment.id}
                variant="outline-dark"
                className="reply-comment-button"
                onClick={() => {
                  scrollToElement();
                  setReplyId(comment.id);
                  setReplying(true);
                  setCommentToReplyTo(comment);
                }}
              >
                Reply
              </Button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Comments;
