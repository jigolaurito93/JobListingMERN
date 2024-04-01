import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

// Register a new user
export const register = async (req, res) => {
  // if the user is the first account that is registered,
  const isFirstAccount = (await User.countDocuments()) === 0;
  // If it is true, then role is admin, if false, then role is user
  req.body.role = isFirstAccount ? "admin" : "user";

  //   Hash the password from the body
  const hashedPassword = await hashPassword(req.body.password);

  //   overwrite the value of the password and use the hashed password
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

// Login a user
export const login = async (req, res) => {
  // Find a user in the database that has the same email as the input email address
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  //   If the input password doesnt match the hashed password, log an error
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  res.send("login");
};
