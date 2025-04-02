import express from "express";
import {
  createUserController,
  getAllUsersController,
  singinUserController,
} from "../controllers/userController.js";
import { validate } from "../validators/zodValidator.js";
import { zodUserSchema } from "../validators/zodUserSchema.js";
import { isAuthenticated } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.route("/").get(isAuthenticated, getAllUsersController);
userRouter
  .route("/signup")
  .post(isAuthenticated, validate(zodUserSchema), createUserController);

userRouter.route("/singin").post(singinUserController);

export default userRouter;
