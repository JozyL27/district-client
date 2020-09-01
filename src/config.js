export default {
  API_ENDPOINT:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_ENDPOINT
      : "http://localhost:8000/api",
  TOKEN_KEY:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_TOKEN_KEY
      : "super-super-super-secret",
  SOCKET_CONNECTION:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SOCKET_CONNECTION
      : "http://localhost:8000",
};
