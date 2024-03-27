import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.json({ message: "data received", data: req.body });
  console.log(req);
});

const port = process.env.PORT || 5100

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
