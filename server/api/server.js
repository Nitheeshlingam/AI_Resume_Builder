import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import "../../server/configs/db.js";
import connectDB from "../configs/db.jsnfigs/db.js";
import userRouter from "../routes/userRoutes.jserRoutes.js";
import resumeRouter from "../routes/resumeRoutes.jsmeRoutes.js";
import aiRouter from "../routes/aiRoutes.jsaiRoutes.js";

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

app.get("/", (req, res) => {
  res.send("Backend is live on Vercel!");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

export default serverless(app);
