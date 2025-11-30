import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "../configs/db.js";
import userRouter from "../routes/userRoutes.js";
import resumeRouter from "../routes/resumeRoutes.js";
import aiRouter from "../routes/aiRoutes.js";

const app = express();

app.use(cors({
  origin: ["https://sparcv-client.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

// Connect DB for each request (serverless-friendly)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "SparkCV API is running!" });
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

export default serverless(app);