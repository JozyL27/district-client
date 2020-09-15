import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserContext from "../../Context/UserContext";
import AuthApiService from "../../services/auth-api-service";
import { Link } from "react-router-dom";

export default class Login extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null, username: "", password: "" };

  componentDidMount() {
    this.setState({ error: null, username: "", password: "" });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    this.setState({ error: null });
    AuthApiService.postLogin({
      username: username,
      password: password,
    })
      .then((res) => {
        this.setState({
          username: "",
          password: "",
        });
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <>
        <form onSubmit={this.onSubmit} className="loginForm">
          <p className="loginPara">Login</p>
          {error && <p className="error">{error || error.message}</p>}
          <TextField
            id="username"
            label="username"
            variant="outlined"
            onChange={(event) => {
              this.handleChange(event);
            }}
            required
            value={username}
            name="username"
            type="text"
            margin="normal"
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            onChange={(event) => {
              this.handleChange(event);
            }}
            required
            value={password}
            type="password"
            name="password"
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>

          <p className="formPara">Need an account?</p>
          <span className="formSpan">
            <Link to="/signup" className="formLink">
              Register
            </Link>
          </span>
        </form>
      </>
    );
  }
}
