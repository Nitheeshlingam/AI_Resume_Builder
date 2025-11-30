import express from "express";
import serverless from "serverless-http";
import cors from "cors";

// Only load dotenv in development
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["https://sparcv-client.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Database connection middleware
let dbConnection = null;

app.use(async (req, res, next) => {
  try {
    if (!dbConnection) {
      dbConnection = await connectDB();
      console.log("✅ Database connected");
    }
    next();
  } catch (error) {
    console.error("❌ Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "SparkCV Backend is running!",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "API is healthy",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

export default serverless(app);
