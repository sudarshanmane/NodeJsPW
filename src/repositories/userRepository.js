import user from "../schema/user.js";

export const findUserByEmail = async (email) => {
  try {
    const doc = await user.findOne({ email: email });
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const findAllUsers = async () => {
  try {
    const docs = await user.find();
    return docs;
  } catch (error) {
    console.log(error);
  }
};
