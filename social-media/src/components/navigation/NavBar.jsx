import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AiFillHome } from "react-icons/ai";
import { BsPlusLg, BsPeopleFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { NameContext } from "../context/NameContext";
import smallLogo from "../../images/small-logo.png";
import logo from "../../images/logo.png";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);

  if (auth) {
    return (
      <nav>
        <Link to="/">
          <img src={smallLogo} className="small-logo" />
          <img src={logo} className="larger-logo" />
        </Link>
        <NavLink to="/">
          <AiFillHome />
          <p className="nav-text">Home</p>
        </NavLink>
        <NavLink to="/create-Post">
          <BsPlusLg />
          <p className="nav-text">Create</p>
        </NavLink>
        <NavLink to={`/profiles/${authName}`}>
          <FaUserAlt />
          <p className="nav-text">My profile</p>
        </NavLink>
        <NavLink to="/list-profiles">
          <BsPeopleFill />
          <p className="nav-text">Profiles</p>
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
