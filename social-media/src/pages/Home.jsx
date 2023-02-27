import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import PostsCard from "../components/posts/PostsCard";
import { getOptions } from "../components/getOptions";
import fetchPosts from "../components/fetch/fetchPosts";
import LoadingIndicator from "../components/loading/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { TrackReactionContext } from "../components/context/ReactionContext";
import Pagination from "../components/Pagination";
import { AUTHOR, BASE_URL, REACTIONS } from "../components/constants/baseUrl";
import FloatingError from "../components/feedback/FloatingError";
function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);
  const [trackReaction, setTrackReaction] = useContext(TrackReactionContext);
  const [offset, setOffset] = useState(0);
  const [postLimit, setPostLimit] = useState(15);
  const navigate = useNavigate();
  const options = getOptions(auth);

  const postUrl = BASE_URL + `posts?${AUTHOR}&${REACTIONS}&offset=${offset}&limit=${postLimit}`;

  useEffect(() => {
    if (!auth) {
      navigate("/welcome");
    }
    if (!trackReaction) {
      setTrackReaction([]);
    }
    fetchPosts(postUrl, options, setPosts, setError, setLoading, setShowError);
  }, [offset]);

  return (
    <>
      <Pagination offset={offset} setOffset={setOffset} />
      {loading && <LoadingIndicator />}
      {showError && <FloatingError error={error} setShowError={setShowError} />}

      {posts.map((post) => (
        <PostsCard post={post} key={post.id + post.title} />
      ))}
      <Pagination offset={offset} setOffset={setOffset} />
    </>
  );
}

export default Home;
