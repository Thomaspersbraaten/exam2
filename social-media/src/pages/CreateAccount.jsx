import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BASE_URL } from "../components/constants/baseUrl";
import Form from "react-bootstrap/Form";
import ImageChecker from "../components/imageComponents/ImageChecker";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ErrorMessage from "../components/feedback/ErrorMessage";
import WelcomeLogo from "../components/WelcomeLogo";
import axios from "axios";
function CreateAccount() {
  const createAccountUrl = BASE_URL + "auth/register";
  const [bannerUrl, setBannerUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const emailRegex = "^[^@]+@(stud\\.noroff\\.no)$";

  const nameRegex = /^[a-zA-Z0-9_]+$/;
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name").matches(nameRegex, "Name may only contain English letters, numbers, and underscores.").min(1, "Must be atleast one character"),
    email: yup.string().required("Please enter your email").matches(emailRegex, "Must be a valid stud.noroff.no email"),
    banner: yup.string().optional(""),
    avatar: yup.string().optional(""),
    password: yup.string().required("Please enter a password").min(8, "Must be atleast 8 characters"),
    passwordMatches: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function sendAccountInfo(data) {
    try {
      const response = await axios.post(createAccountUrl, data);
      if (response.data.id) {
        console.log(response);
        navigate("/login");
      } else {
        setError("An error occured, please try again.");
      }
    } catch (error) {
      setError("An error occured, please try again.");
    }
  }
  return (
    <>
      <WelcomeLogo />
      <Form onSubmit={handleSubmit(sendAccountInfo)} className="form">
        <div className="form-container">
          <Header size="2" cssClass="header-border-bottom">
            Sign up for an account here
          </Header>

          {error && <ErrorMessage variant="danger" message={error} />}

          <Form.Group>
            <Form.Label className="create-post-label">
              Your name <span className="required">*</span>
            </Form.Label>
            <Form.Control placeholder="Your name here" type="input" {...register("name")} className="small-input" />
            {errors.name && <ErrorMessage variant="danger" message={errors.name.message} />}
          </Form.Group>

          <Form.Group>
            <Form.Label className="create-post-label">
              Your email <span className="required">*</span>
            </Form.Label>
            <Form.Control placeholder="example@stud.noroff.no" type="input" {...register("email")} className="small-input" />
            {errors.email && <ErrorMessage variant="danger" message={errors.email.message} />}
          </Form.Group>

          <Form.Group>
            <Form.Label className="create-post-label">Image for your profile banner</Form.Label>
            <Form.Control
              placeholder="Url link for your banner"
              type="input"
              {...register("banner")}
              onChange={(e) => {
                setBannerUrl(e.target.value);
              }}
            />
            <ImageChecker imageUrl={bannerUrl} />
          </Form.Group>

          <Form.Group>
            <Form.Label className="create-post-label">Image for your avatar</Form.Label>
            <Form.Control
              placeholder="Url link for your avatar"
              type="input"
              {...register("avatar")}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
              }}
            />
            <ImageChecker imageUrl={avatarUrl} />
          </Form.Group>

          <Form.Group>
            <Form.Label className="create-post-label">
              Password <span className="required">*</span>
            </Form.Label>
            <Form.Control type="password" {...register("password")} className="small-input" />
            {errors.password && <ErrorMessage variant="danger" message={errors.password.message} />}
          </Form.Group>

          <Form.Group>
            <Form.Label className="create-post-label">
              Confirm Password <span className="required">*</span>
            </Form.Label>
            <Form.Control type="password" {...register("passwordMatches")} className="small-input" />
            {errors.passwordMatches && <ErrorMessage variant="danger" message={errors.passwordMatches.message} />}
          </Form.Group>

          <div className="signup-button-container">
            <button type="submit" className="signup__button">
              Create Account
            </button>
          </div>
        </div>
      </Form>

      <div className="login">
        <p>Already have an account? </p>
        <button
          className="login__button login-button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </button>
      </div>
    </>
  );
}

export default CreateAccount;
