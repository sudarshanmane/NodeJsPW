import post from "../schema/post.js";
import postRepository from "./../repositories/postRepository.js";

// processing logic implement here

export const createPostService = async (createPostObject) => {
  const caption = createPostObject.caption?.trim();
  const image = createPostObject.image;
  const user = createPostObject.user;

  try {
    const post = await postRepository.createdPost(caption, image, user);
    return post;
  } catch (error) {
    throw error;
  }
};

export const countAllPostService = async () => {
  const docs = await postRepository.countAllPostRepository();
  return docs;
};

export const getAllPostsService = async (offset, limit) => {
  const posts = await postRepository.findAllPosts(offset, limit);

  const totalDocuments = await postRepository.countAllPostRepository();
  const totalPages = Math.ceil(totalDocuments / limit);

  return { posts, totalDocuments, totalPages };
};

export const deletePostService = async (id, user) => {
  try {
    const postDoc = await postRepository.findPostById(id);

    if (!postDoc) {
      throw {
        status: 400,
        message: "Post not found!",
      };
    }

    if (postDoc?.user?.id !== user?.id) {
      throw {
        status: 400,
        message: "Unothorised",
      };
    }

    const doc = await postRepository.deletePostById(id);
    return doc;
  } catch (error) {
    throw error;
  }
};

export const updatePostService = async (id, updateObject) => {
  const doc = await postRepository.updatePostByIdRepo(id, updateObject);
  return doc;
};
