import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import llmRoutes from "./routes/llmRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import { authenticate } from "./middleware/authMiddleware.js";
import { me } from "./controllers/authController.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* Health check route */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/lessons", lessonRoutes);
app.use("/bookings", bookingRoutes);
app.use("/sessions", sessionRoutes);
app.use("/llm", llmRoutes);

// Spec: GET /me
app.get("/me", authenticate, me);



app.get("/", (req, res) => {
  res.send("Mentora API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
