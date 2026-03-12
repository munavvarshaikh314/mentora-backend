import express from "express";
import { createSession } from "../controllers/sessionController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authenticate, requireRole("MENTOR"), createSession);

export default router;
