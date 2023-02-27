import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import bannerPlaceholder from "../../images/image-placeholder.png";
import avatarPlaceholder from "../../images/avatar-placeholder.png";
import changeAccountPicture from "./changeAccountPicture";
import { NameContext } from "../context/NameContext";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import FloatingError from "../feedback/FloatingError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Avatar from "../imageComponents/Avatar";
import Banner from "../imageComponents/Banner";

function ChangeImageModal({ setProfile, profile, show, setShow, imageType }) {
  const [authName] = useContext(NameContext);
  const [auth] = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { name } = useParams();
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <>
      {showError && <FloatingError error={error} setShowError={setShowError} />}
      <Modal show={show} onHide={() => setShow(false)} className="modal-top">
        <Modal.Body>
          {imageType === "avatar" && <Avatar src={!profile.avatar ? avatarPlaceholder : profile.avatar} cssClass="modal-image" />}
          {imageType === "banner" && <Banner src={!profile.banner ? bannerPlaceholder : profile.banner} cssClass="modal-image" />}
        </Modal.Body>
      </Modal>
      {authName === name && (
        <Modal show={show} onHide={() => setShow(false)} className="modal-bottom">
          <Modal.Body className="modal-bottom__body">
            <div className="modal-actions">
              {showInput ? (
                <>
                  <Form.Group>
                    <Form.Label className="create-post-label">Image for your profile {imageType}</Form.Label>
                    <Form.Control
                      placeholder={`Url link for your ${imageType}`}
                      type="input"
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <p
                    onClick={() => {
                      changeAccountPicture(auth, authName, imageType, imageUrl, "change", profile, setProfile, setShow, setError, setShowError, setShowInput);
                    }}
                  >
                    Confirm
                  </p>
                </>
              ) : (
                <>
                  <p
                    onClick={() => {
                      setShowInput(true);
                    }}
                  >
                    Change {imageType} picture
                  </p>
                  <p
                    variant="danger"
                    className="modal-actions__remove"
                    onClick={() => {
                      changeAccountPicture(auth, authName, imageType, imageUrl, "remove", profile, setProfile, setShow, setError, setShowError, setShowInput);
                    }}
                  >
                    Remove {imageType} picture
                  </p>
                </>
              )}

              <Button
                variant="dark"
                onClick={() => {
                  setShow(false);
                  setShowInput(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ChangeImageModal;
