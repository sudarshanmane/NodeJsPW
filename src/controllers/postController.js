import {
  createPostService,
  deletePostService,
  getAllPostsService,
  updatePostService,
} from "../services/postService.js";

export async function createPost(req, res, next) {
  // call the service layer to manipulate the data

  const post = await createPostService({
    caption: req?.body?.caption,
    image: req?.file?.filename,
  });

  return res.json({
    message: "Post Created Successfully!",
    success: true,
    data: post,
  });
}

export async function getAllPosts(req, res, next) {
  const limit = req?.query?.limit || 10;
  const offset = req?.query?.offset || 1;

  const docs = await getAllPostsService(offset, limit);

  res.status(200).json({ success: true, data: docs });
}

export async function deletePost(req, res, next) {
  const postId = req.params.id;

  if (!postId) {
    res.status(400).json({ success: false, message: "Id is required!" });
  }

  const deletePost = await deletePostService(postId);

  if (!deletePost) {
    return res.json({
      message: "Id not found!",
      success: false,
    });
  }

  res.status(200).json({
    message: "Post Deleted Successfully!",
    success: true,
    data: deletePost,
  });
}

export async function updatePost(req, res, next) {
  try {
    const updateObject = req.body;
    const id = req.params.id;

    if (req.file) {
      updateObject.image = req.file.filename;
    }

    const response = await updatePostService(id, updateObject);

    return res.status(200).json({
      message: "Post Updated Successfully!",
      success: true,
      data: response,
    });
  } catch (error) {}
}
