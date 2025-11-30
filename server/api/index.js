import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import connectDB from "../configs/db.js";
import userRouter from "../routes/userRoutes.js";
import resumeRouter from "../routes/resumeRoutes.js";
import aiRouter from "../routes/aiRoutes.js";

// Connect DB
await connectDB();

const app = express();

// Enhanced CORS configuration
app.use(
  cors({
    origin: ["https://sparcv-client.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check route with detailed response
app.get("/api", (req, res) => {
  res.json({
    message: "Backend is live on Vercel!",
    timestamp: new Date().toISOString(),
    status: "success",
  });
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    error: "Internal server error",
    message: error.message,
  });
});

// Add this route before your other routes for testing
app.get("/api/test", (req, res) => {
  console.log("Test endpoint hit");
  res.json({ 
    status: "success",
    message: "API is working correctly",
    database: "connected", // You might want to check DB connection here
    timestamp: new Date().toISOString()
  });
});

export default serverless(app);
