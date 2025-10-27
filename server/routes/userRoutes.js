import express from "express";
import { registerUser, loginUser, getUserById, getuserResumes } from "../controllers/userController";
import protect from "../middlewares/authMiddleware";
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', Protect, getUserById);
userRouter.get('/resumes', protect, getuserResumes)


export default userRouter;