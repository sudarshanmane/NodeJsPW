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
import { isAdmin, isAuthenticated } from "../middlewares/authMiddlewares.js";

const postRouter = express.Router(); // Router Obj to modulerize the routes

postRouter
  .route("/")
  .post(
    isAuthenticated,
    upload.single("image"),
    validate(zodPostSchema),
    createPost
  )
  .get(isAuthenticated, getAllPosts);

postRouter
  .route("/:id")
  .delete(isAuthenticated, deletePost)
  .put(isAuthenticated, isAdmin, upload.single("image"), updatePost);

export default postRouter;
