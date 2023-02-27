import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

function PageNotFound() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <h1>Whoopsey!</h1>
      <div>404 Page not found</div>
      <img src="https://i.kym-cdn.com/photos/images/newsfeed/001/042/619/4ea.jpg" className="not-found-image" />
      <p>This page does not exist, but Travolta is looking....</p>

      <Button onClick={goBack}>Click here to go back</Button>

      <Link to={auth ? "/" : "/welcome"}>
        <Button>Click here to go to home page</Button>
      </Link>
    </div>
  );
}

export default PageNotFound;
