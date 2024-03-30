import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

const router = Router();

// YOU CAN DO THIS BUT...

// router.get("/", getAllJobs);
// router.post("/", createJob);
// router.get("/:id", getJob);
// router.patch("/:id", updateJob);
// router.delete("/:id", deleteJob);

// YOU CAN ALSO DO THIS!
router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(validateIdParam, validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
