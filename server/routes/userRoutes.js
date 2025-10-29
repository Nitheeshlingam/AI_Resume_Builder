import express from "express";
import { registerUser, loginUser, getUserById, getuserResumes } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getuserResumes)


export default userRouter;