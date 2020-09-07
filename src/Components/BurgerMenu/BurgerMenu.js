import React, { Component } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import UserContext from "../../Context/UserContext";
import TokenService from "../../services/token-service";
import ProfileAvatar from "../Utils/ProfileAvatar";
import UserService from "../../services/user-service";
import "../../Styles/BurgerMenu.css";

export default class BurgerMenu extends Component {
  static contextType = UserContext;

  state = { open: false, avatar: null, username: "" };

  handleLinkClick = () => {
    this.setState({ open: false });
  };

  handleLogoutClick = () => {
    this.context.processLogout();
    this.setState({ open: false, avatar: null, username: "" });
  };

  handleStateChange(state) {
    this.setState({ open: state.isOpen });
  }

  setUserInfo = () => {
    if (TokenService.hasAuthToken()) {
      const { user } = this.context;
      UserService.getAuthorInfo(user.id).then((res) =>
        this.setState({ avatar: res.avatar, username: res.username })
      );

      return (
        <>
          <Link to="/myProfile" onClick={this.handleLinkClick}>
            <ProfileAvatar avatar={this.state.avatar} />
          </Link>
          <p>{this.state.username}</p>
        </>
      );
    } else {
      return (
        <>
          <ProfileAvatar />
          <p>Guest</p>
        </>
      );
    }
  };

  renderLoginLink = () => {
    return (
      <>
        <li className="burgerLi">
          <Link
            to="/login"
            className="burgerLink"
            onClick={this.handleLinkClick}
          >
            Login
          </Link>
        </li>
        <li className="burgerLi">
          <Link
            to="/signup"
            className="burgerLink"
            onClick={this.handleLinkClick}
          >
            Register
          </Link>
        </li>
      </>
    );
  };

  renderLogoutLink = () => {
    return (
      <>
        <li className="burgerLi">
          <Link
            to="/feed"
            className="burgerLink"
            onClick={this.handleLinkClick}
          >
            Feed
          </Link>
        </li>
        <li className="burgerLi">
          <Link
            to="/message"
            className="burgerLink"
            onClick={this.handleLinkClick}
          >
            Messages
          </Link>
        </li>
        <li className="burgerLi">
          <Link
            to="/myProfile"
            className="burgerLink"
            onClick={this.handleLinkClick}
          >
            Profile
          </Link>
        </li>
        <li className="burgerLi">
          <Link
            to="/login"
            className="burgerLink"
            onClick={this.handleLogoutClick}
          >
            Logout
          </Link>
        </li>
      </>
    );
  };

  render() {
    return (
      <>
        <Menu
          right
          outerContainerId={"outer-container"}
          width={"280px"}
          noOverlay
          isOpen={this.state.open}
          onStateChange={(state) => this.handleStateChange(state)}
        >
          {/* {this.setUserInfo()} */}
          <ul className="burgerUl">
            <li className="burgerLi">
              <Link
                to="/explore"
                className="burgerLink"
                onClick={this.handleLinkClick}
              >
                explore
              </Link>
            </li>
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </ul>
        </Menu>
      </>
    );
  }
}
