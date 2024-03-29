// MAKE SURE TO IMPORT THIS AT THE VERY TOP
// Handles any asynchronous errors and passed it throught the middleware
import "express-async-errors";
//
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

// routers
import jobRouter from "./routes/jobRouter.js";

// middlware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.post(
  "/api/v1/test",
  [body("name").notEmpty().withMessage("name is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((error) => error.msg);
      res.status(400).json({ errors: errorMessage });
    }
    next();
  },
  (req, res) => {
    const { name } = req.body;

    res.json({ msg: `hello` });
  }
);

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
