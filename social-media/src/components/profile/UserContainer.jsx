import Button from "react-bootstrap/esm/Button";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { AuthContext } from "../context/AuthContext";
import { NameContext } from "../context/NameContext";
import { getOptions } from "../getOptions";
import FloatingError from "../feedback/FloatingError";

function UserContainer({ profile, amIFollowing, setAmIFollowing, followers, setFollowers }) {
  const [auth] = useContext(AuthContext);
  const [authName] = useContext(NameContext);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const { name } = useParams();

  const unfollowUrl = BASE_URL + "profiles/" + name + "/unfollow";
  const followUrl = BASE_URL + "profiles/" + name + "/follow";
  const options = getOptions(auth, "PUT");

  async function followUser() {
    try {
      const response = await fetch(followUrl, options);
      const json = await response.json();
      if (response.status === 200) {
        if (json.name) {
          setAmIFollowing(true);
          setFollowers([
            ...followers,
            {
              name: json.name,
              avatar: json.avatar,
            },
          ]);
        }
      } else if (response.status === 429) {
        setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
        setShowError(true);
      } else {
        setError("An error occured, Please try again.");
        setShowError(true);
      }
    } catch (error) {
      setError("An error occured, Please try again.");
      setShowError(true);
    }
  }
  async function unfollowUser() {
    try {
      const response = await fetch(unfollowUrl, options);
      const json = await response.json();
      if (response.status === 429) {
        setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
        setShowError(true);
      }
      if (json.name) {
        const filteredFollowers = followers.filter((fol) => fol.name !== json.name);
        setFollowers(filteredFollowers);
        setAmIFollowing(false);
      }
    } catch (error) {
      setError("An error occured, Please try again.");
      setShowError(true);
    }
  }

  return (
    <div className="user-container">
      {showError && <FloatingError error={error} setShowError={setShowError} />}
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>

      {authName === name ? (
        ""
      ) : (
        <Button
          className="follow-button"
          variant={!amIFollowing ? "primary" : "warning"}
          onClick={() => {
            if (amIFollowing) {
              unfollowUser();
            } else {
              followUser();
            }
          }}
        >
          {amIFollowing ? "Unfollow" : "follow"}
        </Button>
      )}
    </div>
  );
}

export default UserContainer;
