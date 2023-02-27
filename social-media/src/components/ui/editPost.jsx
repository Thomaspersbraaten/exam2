import { useEffect } from "react";
import { BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT } from "../constants/api";
import fetchPosts from "../fetch/fetchPosts";
import { getOptions } from "../getOptions";

async function editPost(title, body, media, tags, auth, id, setPost, setShowEditForm) {
  const editPostUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + `/${id}`;

  const data = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  };
  const options = getOptions(auth, "PUT", data);
  try {
    const response = await fetch(editPostUrl, options);
    const json = await response.json();
    if (response.status === 200) {
      setPost(json);
      setShowEditForm(false);
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

export default editPost;
