import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import connectDB from "../configs/db.js";
import userRouter from "../routes/userRoutes.js";
import resumeRouter from "../routes/resumeRoutes.js";
import aiRouter from "../routes/aiRoutes.js";

// Connect DB
await connectDB();

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

// Root route - this handles requests to "/"
app.get("/", (req, res) => {
  res.json({
    message: "SparkCV Backend Server is running!",
    status: "success",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      health: "/api",
      test: "/api/test",
      users: "/api/users",
      resumes: "/api/resumes",
      ai: "/api/ai",
    },
  });
});

// Health check route
app.get("/api", (req, res) => {
  res.json({
    message: "Backend API is live on Vercel!",
    timestamp: new Date().toISOString(),
    status: "success",
    environment: process.env.NODE_ENV || "development",
  });
});

// Test endpoint with DB connection check
app.get("/api/test", async (req, res) => {
  try {
    const dbStatus =
      mongoose.connection.readyState === 1 ? "connected" : "disconnected";

    res.json({
      status: "success",
      message: "API is working correctly",
      database: dbStatus,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "API test failed",
      error: error.message,
    });
  }
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Catch-all handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    error: "Internal server error",
    message: error.message,
    environment: process.env.NODE_ENV || "development",
  });
});

export default serverless(app);
