import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  // Pass in 3 things
  // Payload, secret key and an object that contains when it expires
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    // It expires in 1 Day
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
