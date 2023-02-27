import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import ErrorMessage from "../components/feedback/ErrorMessage";
import { getOptions } from "../components/getOptions";
import ProfileCard from "../components/listOfProfiles/ProfileCard";
import Pageination from "../components/Pagination";
import LoadingIndicator from "../components/loading/LoadingIndicator";
import { BASE_URL } from "../components/constants/baseUrl";
import FloatingError from "../components/feedback/FloatingError";
import { useNavigate } from "react-router-dom";

function Profiles() {
  const [auth] = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberOfProfiles, setNumberOfProfiles] = useState(15);
  const [profileLimitReached, setProfileLimitReached] = useState(false);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/welcome");
    }
  }, []);
  const profileUrl = BASE_URL + `profiles/?limit=${numberOfProfiles}&offset=${offset}`;
  const options = getOptions(auth, "GET");

  useEffect(() => {
    async function getProfiles() {
      setLoading(true);
      if (profileLimitReached) {
        return;
      }
      try {
        const response = await fetch(profileUrl, options);
        const json = await response.json();
        if (response.status === 200) {
          setProfiles(json);
        } else if (response.status === 429) {
          setShowError(true);
          setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
        } else {
          setShowError(true);
          setError("An error occured, Please try again.");
        }
        if (json.length < 15) {
          setProfileLimitReached("No more profiles to show...");
        }
      } catch (error) {
        setShowError(true);
        setError("An error occured, Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
  }, [offset]);
  return (
    <>
      <h1>List of profiles</h1>
      <Pageination offset={offset} setOffset={setOffset} />
      {loading && <LoadingIndicator />}
      {showError && <FloatingError error={error} setShowError={setShowError} />}
      {profiles.map((profile) => (
        <ProfileCard profile={profile} key={profile.email} />
      ))}
      <Pageination offset={offset} setOffset={setOffset} />
      {profileLimitReached && (
        <div className="end-container">
          <ErrorMessage message={profileLimitReached} variant="warning" />
        </div>
      )}
    </>
  );
}

export default Profiles;
