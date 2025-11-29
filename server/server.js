import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import "dotenv/config.js";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

// Database
await connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "https://sparcv-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend working on Vercel!");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// ❗ No app.listen() in Vercel
export const handler = serverless(app);
export default app;
