import React, { Component } from "react";
import TokenService from "../services/token-service";
import UserService from "../services/user-service";
import io from "socket.io-client";
import config from "../config";

const UserContext = React.createContext({
  user: {},
  userInfo: {},
  socket: null,
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  updateUserInfo: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = { user: {}, error: null, socket: null, userInfo: {} };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload) {
      const socket = io(config.SOCKET_CONNECTION);
      state.user = {
        id: jwtPayload.user_id,
        email: jwtPayload.email,
        username: jwtPayload.sub,
      };
      state.socket = socket.connect();
      UserService.getAuthorInfo(state.user.id).then((res) =>
        this.setState({ userInfo: res })
      );
    }

    this.state = state;
  }

  setUser = (user) => {
    this.setState({ user });
  };

  processLogin = (authToken) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    const socket = io(config.SOCKET_CONNECTION);
    this.setUser({
      id: jwtPayload.user_id,
      email: jwtPayload.email,
      username: jwtPayload.sub,
    });
    this.setState({ socket: socket.connect() });

    UserService.getAuthorInfo(this.state.user.id).then((res) =>
      this.setState({ userInfo: res })
    );
  };

  updateUserInfo = () => {
    UserService.getAuthorInfo(this.state.user.id).then((res) =>
      this.setState({ userInfo: res })
    );
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    this.setUser({});
    this.state.socket.disconnect();
    this.setState({ socket: null, userInfo: {} });
  };

  render() {
    const values = {
      user: this.state.user,
      userInfo: this.state.userInfo,
      socket: this.state.socket,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      updateUserInfo: this.updateUserInfo,
    };
    return (
      <UserContext.Provider value={values}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
