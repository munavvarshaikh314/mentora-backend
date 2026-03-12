import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking
} from "../controllers/bookingController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authenticate, requireRole("PARENT"), createBooking);

router.get("/", authenticate, requireRole("PARENT"), getMyBookings);

router.delete("/:id", authenticate, requireRole("PARENT"), cancelBooking);

export default router;
