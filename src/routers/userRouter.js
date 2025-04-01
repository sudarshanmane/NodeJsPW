import express from "express";
import {
  createUserController,
  getAllUsersController,
} from "../controllers/userController.js";
import { validate } from "../validators/zodValidator.js";
import { zodUserSchema } from "../validators/zodUserSchema.js";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsersController);

userRouter.route("/signup").post(validate(zodUserSchema), createUserController);

export default userRouter;
