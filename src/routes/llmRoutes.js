import express from "express";
import { summarize } from "../controllers/llmController.js";
import { llmLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Rate limited via llmLimiter in middleware
router.post("/summarize", llmLimiter, summarize);

export default router;
