import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import TokenService from "../../services/token-service";
import "../../Styles/Menu.css";

export default function Menu() {
  const context = useContext(UserContext);

  const handleLogoutClick = () => {
    context.processLogout();
  };

  const renderLoginLink = () => {
    return (
      <>
        <li className="navLink">
          <Link to="/login" className="menuLink">
            login
          </Link>
        </li>
        <li className="navLink">
          <Link to="/signup" className="menuLink">
            Register
          </Link>
        </li>
      </>
    );
  };

  const renderLogoutLink = () => {
    return (
      <>
        <li className="navLink">
          <Link to="/feed" className="menuLink">
            Feed
          </Link>
        </li>
        <li className="navLink">
          <Link to="/message" className="menuLink">
            Messages
          </Link>
        </li>
        <li className="navLink">
          <Link to="/myProfile" className="menuLink">
            Profile
          </Link>
        </li>
        <li className="navLink">
          <Link to="/login" className="menuLink" onClick={handleLogoutClick}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <ul className="navContainer">
        <li className="navLink">
          <Link to="/explore" className="menuLink">
            Explore
          </Link>
        </li>
        {TokenService.hasAuthToken() ? renderLogoutLink() : renderLoginLink()}
      </ul>
    </>
  );
}
