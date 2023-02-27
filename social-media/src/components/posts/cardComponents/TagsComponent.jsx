import Button from "react-bootstrap/esm/Button";
import removeTags from "../../ui/removeTags";

function TagsComponent({ tag, tags, setTags, creating }) {
  return (
    <>
      <p>#{tag}</p>
      {creating && (
        <Button
          value={tag}
          className="remove-tag"
          variant="danger"
          onClick={(e) => {
            removeTags(e, setTags, tags);
          }}
        >
          X
        </Button>
      )}
    </>
  );
}

export default TagsComponent;
