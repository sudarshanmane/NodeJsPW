import user from "../schema/user.js";

export const findUserByEmail = async (email) => {
  try {
    const doc = await user.findOne({ email: email });
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const findAllUsers = async (limit, offset) => {
  try {
    const docs = await user
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .populate([{ path: "posts", select: "caption image" }]);

    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const createUserRepository = async (userObject) => {
  const doc = await user.create(userObject);
  return doc;
};
