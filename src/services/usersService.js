import {
  createUserRepository,
  findAllUsers,
  findUserByEmail,
} from "../repositories/userRepository.js";
import { generateJwtToken } from "../utils/jwt.js";

export const getAllUsersService = async (limit, offset) => {
  const docs = await findAllUsers(limit, offset);
  return docs;
};

export const createUserService = async (userObject) => {
  try {
    const user = await createUserRepository(userObject);

    return user;
  } catch (error) {
    if (error.code === 11000) {
      throw {
        status: 400,
        message: "User with the same name or email already exists.",
      };
    }

    throw error;
  }
};

export const signinUserService = async (userObject) => {
  try {
    if (!userObject?.email) {
      throw {
        status: 400,
        message: "Email is required!",
      };
    }

    let checkUser = await findUserByEmail(userObject.email);

    if (!checkUser) {
      throw {
        status: 404,
        message: "User not found!",
      };
    }

    const token = generateJwtToken({
      email: userObject.email,
      _id: checkUser._id,
      username: checkUser.username,
      role: user.role || "user",
    });

    if (checkUser) {
      checkUser = { user: checkUser, token: token };
    }

    return checkUser;
  } catch (error) {
    if (error.code === 11000) {
      throw {
        status: 400,
        message: "User with the same name or email already exists.",
      };
    }
    throw error;
  }
};

export const checkUserExists = async (user) => {
  try {
    const user = await findUserByEmail({ email: user.email });
    return user;
  } catch (error) {
    throw error;
  }
};
