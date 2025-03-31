import express from "express";
import { getAllUsersController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsersController);

export default userRouter;
