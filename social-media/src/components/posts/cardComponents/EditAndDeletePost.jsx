import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-bootstrap/Modal";

import deletePost from "../../ui/deletePost";
import FloatingError from "../../feedback/FloatingError";
import { NameContext } from "../../context/NameContext";
function EditAndDeletePost({ setShowEditForm }) {
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  const [auth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="post-actions">
      {showError && <FloatingError error={error} setShowError={setShowError} />}
      <Modal show={deleting}>
        <Modal.Body className="delete-modal">
          Are you sure you want to delete this post?
          <Button
            className="delete-post"
            variant="outline-danger"
            onClick={() => {
              deletePost(id, auth, setError, setShowError, navigate, authName);
            }}
          >
            Delete
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              setDeleting(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      <p>This is your post and you may edit and delete it</p>
      <div className="post-actions__buttons">
        <Button
          className="edit-post"
          onClick={() => {
            setShowEditForm(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setDeleting(true);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EditAndDeletePost;
