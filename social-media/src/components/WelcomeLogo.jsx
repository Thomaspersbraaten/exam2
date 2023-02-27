import { Link } from "react-router-dom";
import logo from "../images/logo.png";
function WelcomeLogo() {
  return (
    <div className="landing-logo-container">
      <Link to="/welcome">
        <img src={logo} className="landing-logo" />
      </Link>
    </div>
  );
}

export default WelcomeLogo;
