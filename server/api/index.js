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

// Simple CORS configuration
app.use(cors());

// Or if you need specific origins:
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['https://sparcv-client.vercel.app', 'http://localhost:3000'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get("/api", (req, res) => {
  res.json({ 
    message: "Backend is live on Vercel!",
    status: "success"
  });
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

export default serverless(app);