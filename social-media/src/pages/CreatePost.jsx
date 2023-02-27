import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import ErrorMessage from "../components/feedback/ErrorMessage";
import ImageChecker from "../components/imageComponents/ImageChecker";
import { getOptions } from "../components/getOptions";
import TagsComponent from "../components/posts/cardComponents/TagsComponent";
import Header from "../components/Header";
import { BASE_URL } from "../components/constants/baseUrl";

function CreatePost() {
  const [auth, setAuth] = useContext(AuthContext);
  const [creating, setCreating] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/welcome");
    }
  }, []);
  const goBack = () => {
    navigate(-1);
  };

  const createPostUrl = BASE_URL + `posts`;
  async function createPost(e) {
    e.preventDefault();
    if (title.length < 1) {
      setError("Title must be atleast one character long");
      return;
    }

    const raw = {
      title: title,
      body: body,
      tags: tags,
      media: media,
    };
    const options = getOptions(auth, "POST", raw);

    try {
      const response = await fetch(createPostUrl, options);
      const json = await response.json();
      if (json.id) {
        navigate(`/posts/${json.id}`);
      } else {
        setError("An error occured, please try again.");
      }
    } catch (error) {
      setError("An error occured, please try again.");
    }
  }

  function handleTags() {
    if (tagInput.length === 0) {
      setTagError("Please type something");
      return;
    }
    const checkIfTagExists = tags.includes(tagInput);
    if (checkIfTagExists) {
      setTagError("Tag already exists");
    } else {
      setTags([...tags, tagInput]);
      setTagInput("");
      setTagError(false);
    }
  }

  return (
    <Form className="create-post-form form">
      <div className="form-container">
        <Header size="2" cssClass="header-border-bottom">
          Create a post
        </Header>
        {error && <ErrorMessage variant="danger" message={error} />}
        <Form.Group>
          <Form.Label className="create-post-label">
            Title <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="input"
            placeholder="Write a title (Required)"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="create-post-label">Free text</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Write the post text (Optional)"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image link</Form.Label>

          <Form.Control
            type="input"
            placeholder="Enter link to an image (Optional)"
            value={media}
            onChange={(e) => {
              setMedia(e.target.value);
            }}
          />
          <ImageChecker imageUrl={media} />
        </Form.Group>

        <Form.Group className="create-form-tags">
          <div className="tags-input-label">
            <Form.Label className="create-post-label">Tags</Form.Label>
            <div className="tags-control">
              <Form.Control
                className="create-form-tags__input"
                type="input"
                placeholder="Add some tags (Optional)"
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                }}
              />
            </div>
          </div>

          <Button className="create-form-tags__button" onClick={handleTags}>
            Add tag
          </Button>
        </Form.Group>
        <div>{tagError && <ErrorMessage variant="warning" message={tagError} />}</div>

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
          <Button onClick={goBack} variant="dark">
            Cancel
          </Button>
          <Button onClick={createPost} className="create-form-buttons__submit">
            Create post
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default CreatePost;
