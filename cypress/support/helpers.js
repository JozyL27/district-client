import jwt from "jsonwebtoken";

export const makeLoginToken = () => {
  const loginUser = {
    id: 8,
    username: "test name of user",
  };

  return jwt.sign(loginUser, "test-secret", {
    subject: "test-username",
    algorithm: "HS256",
  });
};
