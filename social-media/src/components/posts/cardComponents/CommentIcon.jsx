import { MdComment } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function CommentIcon({ post, comments }) {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" || location.pathname.includes("profiles") ? (
        <Link to={location.pathname === "/" ? `posts/${post.id}` : `../../posts/${post.id}`} className="comments">
          <MdComment className="comments__icon" />
          {!post._count.comments ? <p>0 Comments</p> : <p>{post._count.comments} Comments</p>}
        </Link>
      ) : (
        <div className="comments">
          <MdComment className="comments__icon" />
          {!comments ? <p>0 Comments</p> : <p>{comments.length} Comments</p>}
        </div>
      )}
    </>
  );
}

export default CommentIcon;
