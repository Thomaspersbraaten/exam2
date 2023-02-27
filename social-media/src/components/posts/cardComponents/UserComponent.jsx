import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Avatar from "../../imageComponents/Avatar";
import PostDate from "../../moment/PostDate";

function UserComponent({ data }) {
  return (
    <>
      <Card.Body className="author-container">
        <div className="user-info">
          {data.author && (
            <>
              <Avatar src={data.author.avatar} />
              <Link to={`/profiles/${data.author.name}`} className="author-name">
                By {data.author.name}
              </Link>
            </>
          )}
        </div>
        <PostDate date={data.created} />
      </Card.Body>
    </>
  );
}

export default UserComponent;
