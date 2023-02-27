import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../../context/AuthContext";
import Form from "react-bootstrap/Form";
import { getOptions } from "../../../getOptions";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/baseUrl";
import ErrorMessage from "../../../feedback/ErrorMessage";

function CommentForm({ setCommentToReplyTo, setComments, comments, replying, setReplying, replyId, commentToReplyTo, referance }) {
  const [commentInput, setCommentInput] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const { id } = useParams();
  const [error, setError] = useState(false);

  const commentUrl = BASE_URL + `posts/${id}/comment`;
  async function sendCommentInfo() {
    if (commentInput.length < 1) {
      return;
    }

    const data = {
      body: commentInput,
    };
    if (replying) data.replyToId = replyId;
    const options = getOptions(auth, "POST", data);

    try {
      const response = await fetch(commentUrl, options);
      const json = await response.json();

      if (response.status === 200) {
        if (json.created) {
          setComments([...comments, json]);
          setReplying(false);
          setCommentInput("");
          setCommentToReplyTo(null);
        }
      } else if (response.status === 429) {
        setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
      } else {
        setError("An error occured, Please try again.");
      }
    } catch (error) {
      setError("An error occured, Please try again.");
    }
  }

  return (
    <form>
      <Form.Group className="comment-group">
        <Form.Label>{commentToReplyTo ? `Replying to ${commentToReplyTo.owner}` : "Comment"}</Form.Label>
        {error && <ErrorMessage variant="danger" message={error} />}
        <Form.Control
          as="textarea"
          rows="3"
          ref={referance}
          id="comment"
          placeholder={commentToReplyTo ? `Type your reply here...` : `Type your comment here...`}
          value={commentInput}
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
        />
        <div className="comment-buttons">
          <Button onClick={sendCommentInfo} className={commentToReplyTo ? "comment-form__button reply" : "comment-form__button comment-to-post"}>
            {commentToReplyTo ? "Reply to comment" : "Comment"}
          </Button>
          {replying && (
            <Button
              variant="dark"
              onClick={() => {
                setCommentToReplyTo(null);
                setReplying(false);
              }}
            >
              Cancel Reply
            </Button>
          )}
        </div>
      </Form.Group>
    </form>
  );
}

export default CommentForm;
