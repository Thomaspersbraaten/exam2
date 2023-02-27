import Card from "react-bootstrap/Card";
import ReactButton from "./cardComponents/ReactButton";
import UserComponent from "./cardComponents/UserComponent";
import Comments from "./cardComponents/comment/Comments";
import EditAndDeletePost from "./cardComponents/EditAndDeletePost";
import CommentIcon from "./cardComponents/CommentIcon";
import TitleBodyImage from "./cardComponents/TitleBodyImage";

export default function PostsCard({ post, referance, comments, setComments, isMyPost, setShowEditForm, showEditForm }) {
  return (
    <Card ref={referance}>
      {isMyPost && <EditAndDeletePost setShowEditForm={setShowEditForm} showEditForm={showEditForm} />}
      <UserComponent data={post} />
      <TitleBodyImage post={post} />
      <Card.Body className="bottom-container">
        <CommentIcon post={post} comments={comments} />
        <ReactButton post={post} />
      </Card.Body>
      {post.comments ? (
        <Card.Body>
          <Comments post={post} comments={comments} setComments={setComments} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
}
