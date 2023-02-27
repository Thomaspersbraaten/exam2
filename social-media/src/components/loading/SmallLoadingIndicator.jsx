// To use when loading extra content onto the page without taking up 100vh.
function SmallLoadingIndicator() {
  return (
    <div className="loading-more-posts">
      <p> Loading...</p>
      <div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
}

export default SmallLoadingIndicator;
