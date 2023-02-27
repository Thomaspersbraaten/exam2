import { BASE_URL } from "../constants/baseUrl";
import { getOptions } from "../getOptions";

async function deletePost(id, auth, setError, setShowError, navigate, authName) {
  const deleteUrl = BASE_URL + `posts/${id}`;
  const options = getOptions(auth, "DELETE");

  try {
    const response = await fetch(deleteUrl, options);

    if (response.status === 200) {
      navigate(`../../profiles/${authName}`);
    } else if (response.status === 429) {
      setShowError(true);

      setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
    } else {
      setError("An error occured, Please try again.");
      setShowError(true);
    }
  } catch (error) {
    setError("An error occured, Please try again.");
    setShowError(true);
  }
}

export default deletePost;
