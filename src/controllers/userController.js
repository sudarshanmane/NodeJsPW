import { getAllUsersService } from "../services/usersService.js";

export const getAllUsersController = async (req, res, next) => {
  const docs = await getAllUsersService();

  res.status(200).json({
    success: true,
    data: docs,
  });
};
