import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Primary signup endpoint per spec
router.post("/signup", register);

router.post("/register", register);

router.post("/login", login);

router.get("/me", authenticate, me);

export default router;
