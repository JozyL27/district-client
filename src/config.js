export default {
  API_ENDPOINT:
    process.env.NODE_ENV === "production"
      ? "https://mysterious-wave-34524.herokuapp.com/api"
      : "http://localhost:8000/api",
  TOKEN_KEY:
    process.env.NODE_ENV === "production"
      ? "sr71-blackbird"
      : "super-super-super-secret",
  SOCKET_CONNECTION:
    process.env.NODE_ENV === "production"
      ? "https://mysterious-wave-34524.herokuapp.com"
      : "http://localhost:8000",
};
