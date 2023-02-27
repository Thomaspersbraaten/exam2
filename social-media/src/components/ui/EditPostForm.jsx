import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ImageChecker from "../imageComponents/ImageChecker";
import TagsComponent from "../posts/cardComponents/TagsComponent";
import Modal from "react-bootstrap/Modal";
import { getOptions } from "../getOptions";
import { AUTHOR, BASE_URL, COMMENTS, REACTIONS } from "../constants/baseUrl";
import ErrorMessage from "../feedback/ErrorMessage";
import Header from "../Header";

function EditPostForm({ post, setPost, setShowEditForm }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [tags, setTags] = useState(post.tags);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState(post.media);
  const [auth, setAuth] = useContext(AuthContext);
  const [creating, setCreating] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  function editPost() {
    if (title.length < 1) {
      setError("Title must be atleast one character long");
      return;
    }
    const editPostUrl = BASE_URL + `posts/${id}?${AUTHOR}&${REACTIONS}&${COMMENTS}`;

    const data = {
      title: title,
      body: body,
      tags: tags,
      media: media,
    };
    const options = getOptions(auth, "PUT", data);
    async function sendData() {
      try {
        const response = await fetch(editPostUrl, options);
        const json = await response.json();
        if (response.status === 200) {
          setPost(json);
          setShowEditForm(false);
        } else if (response.status === 429) {
          setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
        } else {
          setError("An error occured, Please try again.");
        }
      } catch (error) {
        setError("An error occured, Please try again.");
      }
    }
    sendData();
  }

  return (
    <>
      <Modal show={setShowEditForm}>
        <Modal.Body>
          <Form className="edit-form form">
            <div className="form-container">
              <Header size="2" cssClass="header-border-bottom">
                Edit post
              </Header>
              {error && <ErrorMessage variant="danger" message={error} />}
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Write a title (Required)"
                  defaultValue={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  type="input"
                  placeholder="Write the post text (Optional)"
                  defaultValue={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Write the post text (Optional)"
                  defaultValue={media}
                  onChange={(e) => {
                    setMedia(e.target.value);
                  }}
                />
                <ImageChecker imageUrl={media} />
              </Form.Group>
              <Form.Group className="create-form-tags">
                <Form.Control
                  className="create-form-tags__input"
                  type="input"
                  placeholder="Add some tags (Optional)"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                  }}
                />
                <Button
                  className="create-form-tags__button"
                  onClick={() => {
                    setTags([...tags, tagInput]);
                    setTagInput("");
                  }}
                >
                  Add tag
                </Button>
              </Form.Group>

              <Form.Text className="text-muted">
                <Form.Group>
                  <ul className="form-tags">
                    {tags.map((tag, index) => (
                      <li key={tag + index} className="form-tags__tag tag">
                        <TagsComponent tag={tag} tags={tags} setTags={setTags} creating={creating} />
                      </li>
                    ))}
                  </ul>
                </Form.Group>
              </Form.Text>
              <div className="create-form-buttons">
                <Button variant="dark" onClick={() => setShowEditForm(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    editPost();
                  }}
                  className="create-form-buttons__submit"
                >
                  Edit post
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPostForm;
