import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import connectDB from "../configs/db.js";
import userRouter from "../routes/userRoutes.js";
import resumeRouter from "../routes/resumeRoutes.js";
import aiRouter from "../routes/aiRoutes.js";
import "../../server/configs/db.js";

// Connect DB
await connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://sparcv-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is live on Vercel!" });
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Export the serverless app
export default serverless(app);