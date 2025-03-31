import { findAllUsers } from "../repositories/userRepository.js";

export const getAllUsersService = async () => {
  const docs = await findAllUsers();
  return docs;
};
