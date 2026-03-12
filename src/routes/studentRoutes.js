import express from "express";
import { createStudent, getStudents } from "../controllers/studentController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authenticate, requireRole("PARENT"), createStudent);

router.get("/", authenticate, requireRole("PARENT"), getStudents);

export default router;
