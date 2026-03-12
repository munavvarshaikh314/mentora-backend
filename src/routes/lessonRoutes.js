import express from "express";
import {
  createLesson,
  getLessons,
  getLessonById
} from "../controllers/lessonController.js";
import { getLessonSessions } from "../controllers/sessionController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Mentor creates lesson
router.post(
  "/",
  authenticate,
  requireRole("MENTOR"),
  createLesson
);

// Anyone logged in can view lessons
router.get(
  "/",
  authenticate,
  getLessons
);

// Anyone logged in can view lesson details
router.get(
  "/:id",
  authenticate,
  getLessonById
);

// Anyone logged in can view sessions for a lesson
router.get(
  "/:id/sessions",
  authenticate,
  getLessonSessions
);

export default router;
