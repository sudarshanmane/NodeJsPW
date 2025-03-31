import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controllers/postController.js";
import { upload } from "../config/multerConfig.js";
import { validate } from "../validators/zodValidator.js";
import { zodPostSchema } from "../validators/zodPostSchema.js";

const postRouter = express.Router(); // Router Obj to modulerize the routes

postRouter
  .route("/")
  .post(upload.single("image"), validate(zodPostSchema), createPost)
  .get(getAllPosts);

postRouter
  .route("/:id")
  .delete(deletePost)
  .put(upload.single("image"), updatePost);

export default postRouter;
