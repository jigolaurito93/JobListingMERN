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
import authRouter from "./routes/authRouter.js";

// middlware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", jobRouter);

app.use("/api/v1/auth", authRouter);

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
