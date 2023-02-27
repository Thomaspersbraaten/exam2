import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostsCard from "../posts/PostsCard";
import Header from "../Header";
import { AUTHOR, BASE_URL, REACTIONS } from "../constants/baseUrl";
import { getOptions } from "../getOptions";
import FloatingError from "../feedback/FloatingError";
import SmallLoadingIndicator from "../loading/SmallLoadingIndicator";

function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const [auth] = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  const postUrl = BASE_URL + "profiles/" + name + `/posts?${AUTHOR}&${REACTIONS}`;
  const options = getOptions(auth);

  useEffect(() => {
    async function getPosts() {
      setLoading(true);
      try {
        const response = await fetch(postUrl, options);
        const json = await response.json();
        if (response.status === 200) {
          setPosts(json);
          setError(false);
          setShowError(false);
        }
        if (response.status === 404) {
          setError("An error occured, Please try again.");
          setShowError(true);
        }
        if (response.status === 429) {
          setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
          setShowError(true);
        }
      } catch (error) {
        setError("An error occured, Please try again.");
        setShowError(true);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, [name]);

  return (
    <div>
      {showError && <FloatingError error={error} setShowError={setShowError} />}
      <Header cssClass="text-align-left" size="2">
        {posts || posts.length < 1 ? `Posts (${posts.length})` : <h2>Posts (0)</h2>}
      </Header>

      {posts && (
        <div className="profile-posts">
          {loading && <SmallLoadingIndicator />}
          {posts.map((post) => (
            <PostsCard post={post} key={post.id + post.title} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowPosts;
