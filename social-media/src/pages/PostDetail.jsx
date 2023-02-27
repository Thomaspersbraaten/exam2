import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import PostsCard from "../components/posts/PostsCard";
import { NameContext } from "../components/context/NameContext";
import EditPostForm from "../components/ui/EditPostForm";
import { getOptions } from "../components/getOptions";
import LoadingIndicator from "../components/loading/LoadingIndicator";
import { AUTHOR, BASE_URL, COMMENTS, REACTIONS } from "../components/constants/baseUrl";
import FloatingError from "../components/feedback/FloatingError";

function PostDetail() {
  const [auth] = useContext(AuthContext);
  const [authName] = useContext(NameContext);
  const [loading, setLoading] = useState(true);
  const [isMyPost, setIsMyPost] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const postDetailUrl = BASE_URL + `posts/${id}?${AUTHOR}&${REACTIONS}&${COMMENTS}`;
  const options = getOptions(auth);

  useEffect(() => {
    if (!auth) {
      navigate("/welcome");
    }
  }, []);

  useEffect(() => {
    async function getPostDetails() {
      try {
        const response = await fetch(postDetailUrl, options);
        const json = await response.json();
        console.log(response);
        console.log(json);

        if (response.status === 200) {
          setError(false);
          setShowError(false);
          setPost(json);
          setComments(json.comments);

          if (authName === json.author.name) {
            setIsMyPost(true);
          } else {
            setIsMyPost(false);
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
        setLoading(false);
      }
    }
    getPostDetails();
  }, []);

  return (
    <>
      {loading && <LoadingIndicator />}
      {showEditForm && <EditPostForm post={post} setPost={setPost} setShowEditForm={setShowEditForm} />}
      <div className="posts-container">
        {showError && <FloatingError error={error} setShowError={setShowError} />}
        {post.comments && <PostsCard post={post} comments={comments} setComments={setComments} isMyPost={isMyPost} setShowEditForm={setShowEditForm} showEditForm={showEditForm} />}
      </div>
    </>
  );
}

export default PostDetail;
