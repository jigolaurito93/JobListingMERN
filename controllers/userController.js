import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "get current user" });
};
export const getApplicationStats = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "application stats" });
};
export const updateUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
