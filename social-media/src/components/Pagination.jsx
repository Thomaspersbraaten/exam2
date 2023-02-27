function Pagination({ offset, setOffset }) {
  const currentPage = Math.ceil((offset + 1) / 15);

  return (
    <div className="pagination">
      <button
        className="pagination__button prev"
        variant="warning"
        disabled={offset === 0}
        onClick={() => {
          setOffset(offset - 15);
        }}
      >
        Prev
      </button>
      <p className="pagination__page-number">Page {currentPage} </p>

      <button
        className="pagination__button next"
        onClick={() => {
          setOffset(offset + 15);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
