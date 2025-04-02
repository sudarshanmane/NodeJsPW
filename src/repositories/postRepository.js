import post from "../schema/post.js";
import fs from "fs/promises";
import path from "path";

const createdPost = async (caption, image, user) => {
  try {
    const newPost = await post.create({
      caption,
      image,
      user,
    });

    return newPost;
  } catch (error) {
    return error;
  }
};

const countAllPostRepository = async () => {
  try {
    const count = await post.countDocuments({});
    return count;
  } catch (error) {
    console.log(error);
  }
};

const findAllPosts = async (offset, limit) => {
  try {
    const posts = await post
      .find({})
      .populate([{ path: "user" }])
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    return posts;
  } catch (error) {
    return error;
  }
};

const findPostById = async (id) => {
  try {
    const postDoc = await post
      .findById(id)
      .populate([{ path: "user", select: "_id" }]);

    return postDoc;
  } catch (error) {
    return error;
  }
};

const deletePostById = async (id) => {
  try {
    const doc = await post.findByIdAndDelete(id);
    return doc;
  } catch (error) {
    throw error;
  }
};

const deleteImage = async (imagePath) => {
  const imagePathh = path.resolve(imagePath);

  try {
    await fs.unlink("./public/images/" + imagePath);
    console.log("✅ Image deleted successfully.");
  } catch (err) {
    console.error("❌ Failed to delete image:", err.message);
  }
};

const updatePostByIdRepo = async (id, updateObject) => {
  try {
    if (updateObject.image) {
      const doc = await post.findById(id);
      deleteImage(doc.image);
    }

    const doc = await post.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true }
    );

    return doc;
  } catch (error) {
    console.log(error);
  }
};

export default {
  createdPost,
  findAllPosts,
  findPostById,
  deletePostById,
  updatePostByIdRepo,
  countAllPostRepository,
};
