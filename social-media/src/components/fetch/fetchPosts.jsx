// used for fetching the posts in "/" path,
async function fetchPosts(url, options, setPosts, setError, setLoading, setShowError) {
  setLoading(true);
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.status === 200) {
      setError(false);
      setShowError(false);
      setPosts(json);
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

export default fetchPosts;
