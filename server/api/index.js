import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../configs/db.js";
import userRouter from "../routes/userRoutes.js";
import resumeRouter from "../routes/resumeRoutes.js";
import aiRouter from "../routes/aiRoutes.js";

const app = express();

/* ✅ Connect DB (Vercel-safe) */
let isConnected = false;
async function initDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}
initDB();

/* ✅ CORS (STRICT & CORRECT) */
app.use(cors({
  origin: "https://sparcv-client.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* ✅ Handle preflight */
app.options("*", cors());

app.use(express.json());

/* ✅ Routes */
app.get("/", (req, res) => res.send("Server is live..."));
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

export default app;
