import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  {
    id: nanoid(),
    company: "apple",
    position: "frontend",
  },
  {
    id: nanoid(),
    company: "google",
    position: "backend",
  },
];

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

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
});

// GET SINGLE JOB
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  res.status(200).json({ job });
});

// EDIT JOB
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(404).json({ msg: "Please provide company and position" });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({ msg: "Job modified", jobs });
});

// DELETE JOB
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: "Job has been deleted", jobs });
});

const port = process.env.PORT || 5100;

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
