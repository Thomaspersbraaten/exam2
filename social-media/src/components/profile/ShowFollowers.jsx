import { Link } from "react-router-dom";
import Avatar from "../imageComponents/Avatar";
import Header from "../Header";

function ShowFollowers({ followers }) {
  return (
    <>
      <Header cssClass="text-align-left" size="2">
        {followers ? `Followers (${followers.length})` : `Followers (0)`}
      </Header>

      {followers && (
        <div className="follower-container">
          {followers.map((follower, index) => (
            <div className={index + 1 === followers.length ? `last-item follower` : `follower`} key={follower.name + index}>
              <Avatar src={follower.avatar} />
              <Link to={`/profiles/${follower.name}`} className="author-name">
                {follower.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ShowFollowers;
