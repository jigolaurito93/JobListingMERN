import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  // Pass in 3 things
  // Payload, secret key and an object that contains when it expires
  const token = jwt.sign(payload, "secret", {
    // It expires in 1 Day
    expiresIn: "1d",
  });
  return token;
};
