import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

// Register a new user
export const register = async (req, res) => {
  // if the user is the first account that is registered,
  const isFirstAccount = (await User.countDocuments()) === 0;
  // If it is true, then role is admin, if false, then role is user
  req.body.role = isFirstAccount ? "admin" : "user";

  //   The default value is 10
  //  The bigger the value, the more secured but the longer its going to take to hash it
  const salt = await bcrypt.genSalt(10);
  //   Hash the password that was inputed by user
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //   overwrite the value of the password and use the hashed password
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

// Login a user
export const login = async (req, res) => {
  res.send("login");
};
