import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { request } from "express";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidIdMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidIdMongoId) throw new BadRequestError("invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);

    // Check if the user's role is an admin. this should be a boolean
    const isAdmin = req.user.role === "admin";
    // Check if the logged in user has the same userId as the createdBy Id. this should be a boolean
    const isOwner = req.user.userId === job.createdBy.toString();

    // If user not an admin and user is not the owner of the job throw unauthorized error
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    // make sure email field is not empty
    .notEmpty()
    // if it is display this message
    .withMessage("email is required")
    // make sure input is a valid email
    .isEmail()
    // if not display this message
    .withMessage("invalid email format")
    // create a custom validator to check for uniqueness of email
    .custom(async (email) => {
      // Find the email from the User model
      const user = await User.findOne({ email });
      // if email already exists from the User model, throw an error
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    // If password is 7 characters or less, show error message
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    // make sure email field is not empty
    .notEmpty()
    // if it is display this message
    .withMessage("email is required")
    // make sure input is a valid email
    .isEmail()
    // if not display this message
    .withMessage("invalid email format"),

  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    // make sure email field is not empty
    .notEmpty()
    // if it is display this message
    .withMessage("email is required")
    // make sure input is a valid email
    .isEmail()
    // if not display this message
    .withMessage("invalid email format")
    // create a custom validator to check for uniqueness of email
    .custom(async (email, { req }) => {
      // Find the email from the User model
      const user = await User.findOne({ email });
      // if email already exists from the User model, throw an error
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);
