import { useState } from "react";
import ShowFollowing from "./ShowFollowing";
import ShowFollowers from "./ShowFollowers";
import ShowPosts from "./ShowPosts";

function ProfileLinks({ followers, following }) {
  const [showPosts, setShowPosts] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  function handleShowing(booleanPosts, booleanFollowers, booleanFollowing) {
    setShowPosts(booleanPosts);
    setShowFollowers(booleanFollowers);
    setShowFollowing(booleanFollowing);
  }

  return (
    <>
      <div className="profile-links">
        <div
          onClick={() => {
            handleShowing(true, false, false);
          }}
        >
          Posts
        </div>
        <div
          onClick={() => {
            handleShowing(false, true, false);
          }}
        >
          Followers
        </div>
        <div
          onClick={() => {
            handleShowing(false, false, true);
          }}
        >
          Following
        </div>
      </div>
      {showPosts && <ShowPosts />}
      {showFollowers && <ShowFollowers followers={followers} />}
      {showFollowing && <ShowFollowing following={following} />}
    </>
  );
}

export default ProfileLinks;
