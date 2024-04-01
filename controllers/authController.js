import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

// Register a new user
export const register = async (req, res) => {
  // if the user is the first account that is registered,
  const isFirstAccount = (await User.countDocuments()) === 0;
  // If it is true, then role is admin, if false, then role is user
  req.body.role = isFirstAccount ? "admin" : "user";
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

// Login a user
export const login = async (req, res) => {
  res.send("login");
};
