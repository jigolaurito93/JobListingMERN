import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

// Register a new user
export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

// Login a user
export const login = async (req, res) => {
  res.send("login");
};
