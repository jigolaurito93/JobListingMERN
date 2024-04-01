import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", login);

export default router;
