import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import Banner from "../components/imageComponents/Banner";
import UserContainer from "../components/profile/UserContainer";
import Modal from "react-bootstrap/Modal";
import ProfileLinks from "../components/profile/ProfileLinks";
import { NameContext } from "../components/context/NameContext";
import { getOptions } from "../components/getOptions";
import Button from "react-bootstrap/esm/Button";
import logOut from "../components/ui/logOut";
import Header from "../components/Header";
import { BiLogOut } from "react-icons/bi";
import ChangeImageModal from "../components/profile/ChangeImageModal";
import FloatingError from "../components/feedback/FloatingError";
import { BASE_URL, QUERY_FOLLOWERS, QUERY_FOLLOWING, QUERY_POSTS } from "../components/constants/baseUrl";
import Avatar from "../components/imageComponents/Avatar";

function ProfileDetail() {
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);
  const [imageType, setImageType] = useState("");
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const [amIFollowing, setAmIFollowing] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    if (!auth) {
      navigate("/welcome");
    }
  }, []);
  const profileUrl = BASE_URL + `profiles/${name}?${QUERY_POSTS}&${QUERY_FOLLOWING}&${QUERY_FOLLOWERS}`;

  const options = getOptions(auth);
  useEffect(() => {
    async function getProfileDetail() {
      try {
        const response = await fetch(profileUrl, options);
        const json = await response.json();
        if (response.status === 200) {
          setError(false);
          setShowError(false);
          setProfile(json);
          if (json.name === authName) {
            setIsMyProfile(true);
          } else {
            setIsMyProfile(false);
          }
          if (json.following) {
            setFollowing(json.following);
          }
          if (json.posts) {
            setPosts(json.posts);
          }
          if (json.followers) {
            setFollowers(json.followers);
            const amIFollowingTheProfile = json.followers.some((follower) => {
              return follower.name === authName;
            });
            if (amIFollowingTheProfile) {
              setAmIFollowing(true);
            } else {
              setAmIFollowing(false);
            }
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
    getProfileDetail();
  }, [name]);

  const handleClose = () => {
    setShow(false);
    setShowLogout(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      {showError && <FloatingError error={error} setShowError={setShowError} />}
      <ChangeImageModal setShow={setShow} show={show} profile={profile} imageType={imageType} setProfile={setProfile} />
      <div className="profile-container">
        {isMyProfile && (
          <div className="my-profile-container">
            <Header size="1">Your profile </Header>
            <Button
              className="logout-button"
              variant="outline-dark"
              onClick={() => {
                setShowLogout(true);
              }}
            >
              <BiLogOut /> Logout
            </Button>
          </div>
        )}
        <Modal show={showLogout} onHide={handleClose}>
          <Modal.Body className="modal-logout">
            <p>Are you sure you want to logout?</p>
            <Button
              className="logout-button"
              variant="outline-dark"
              onClick={() => {
                logOut(navigate, setAuth, setAuthName);
              }}
            >
              <BiLogOut /> Logout
            </Button>
            <Button onClick={handleClose} variant="dark">
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
        <div className="image-container">
          <div
            onClick={() => {
              handleShow(true);
              setImageType("banner");
            }}
          >
            <Banner author={profile} src={profile.banner} />
          </div>
          <div
            onClick={() => {
              handleShow(true);
              setImageType("avatar");
            }}
          >
            <Avatar src={profile.avatar} cssClass="profile-avatar" />
          </div>
        </div>

        <UserContainer profile={profile} amIFollowing={amIFollowing} setAmIFollowing={setAmIFollowing} followers={followers} setFollowers={setFollowers} />
        <ProfileLinks followers={followers} following={following} />
      </div>
    </>
  );
}

export default ProfileDetail;
