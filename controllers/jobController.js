import Job from "../models/JobModel.js";

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

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(200).json({ job });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    throw new Error("no job with that id");
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  res.status(200).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
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
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: "Job has been deleted", jobs });
};
