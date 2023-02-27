import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import WelcomeLogo from "../components/WelcomeLogo";
function LandingPage() {
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    <div className="landing-container">
      <WelcomeLogo />

      <div className="welcome-text-container">
        <h1>Realize and share your dreams</h1>
        <p>Discover channels and grow your own herd of followers as you peer into the depth of the social media </p>
      </div>

      <div className="login-signup">
        <div className="signup">
          <p>Sign up for an account</p>
          <button
            className="signup__button"
            onClick={() => {
              navigate("/create-account");
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="seperator"></div>

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
      </div>
    </div>
  );
}

export default LandingPage;
