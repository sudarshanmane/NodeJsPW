import mongoose from "mongoose";
import {
  createUserRepository,
  findAllUsers,
} from "../repositories/userRepository.js";

export const getAllUsersService = async () => {
  const docs = await findAllUsers();
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
  }
};
