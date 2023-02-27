import { BASE_URL } from "../constants/baseUrl";

async function changeAccountPicture(auth, authName, type, url, modifier, profile, setProfile, setShow, setError, setShowError, setShowInput) {
  const removePictureUrl = BASE_URL + "profiles/" + authName + "/media";

  let stringifiedBody = {};

  // Remove avatar
  if (modifier === "remove" && type === "avatar") {
    stringifiedBody = JSON.stringify({
      avatar: "",
    });
  }
  // Change Avatar
  if (modifier === "change" && type === "avatar") {
    stringifiedBody = JSON.stringify({
      avatar: url,
    });
  }
  // Remove Banner
  if (modifier === "remove" && type === "banner") {
    stringifiedBody = JSON.stringify({
      banner: "",
    });
  }
  // Change Banner
  if (modifier === "change" && type === "banner") {
    stringifiedBody = JSON.stringify({
      banner: url,
    });
  }

  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
    body: stringifiedBody,
  };
  try {
    const response = await fetch(removePictureUrl, options);

    const json = await response.json();
    if (response.status === 200) {
      setError(false);
      setShowError(false);
      setShowInput(false);
      if (type === "banner") {
        setProfile({ ...profile, banner: json.banner });
      } else {
        setProfile({ ...profile, avatar: json.avatar });
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
  } finally {
    setShow(false);
  }
}

export default changeAccountPicture;
