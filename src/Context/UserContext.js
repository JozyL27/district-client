import React, { Component } from "react";
import TokenService from "../services/token-service";
import io from "socket.io-client";
import config from "../config";

const UserContext = React.createContext({
  user: {},
  error: null,
  socket: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = { user: {}, error: null, socket: null };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload) {
      const socket = io(config.SOCKET_CONNECTION);
      state.user = {
        id: jwtPayload.user_id,
        email: jwtPayload.email,
        username: jwtPayload.sub,
      };
      state.socket = socket.connect();
    }

    this.state = state;
  }

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

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
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    this.setUser({});
    this.state.socket.disconnect();
    this.setState({ socket: null });
  };

  render() {
    const values = {
      user: this.state.user,
      error: this.state.error,
      socket: this.state.socket,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
    };
    return (
      <UserContext.Provider value={values}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
