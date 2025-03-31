import express from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import { validate } from "../validators/zodValidator.js";
import { zodPostSchema } from "../validators/zodPostSchema.js";
import post from "../schema/post.js";

const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/post", postRouter);

export default v1Router;
