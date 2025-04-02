import {
  createUserService,
  getAllUsersService,
  signinUserService,
} from "../services/usersService.js";

export const getAllUsersController = async (req, res, next) => {
  const docs = await getAllUsersService();

  res.status(200).json({
    success: true,
    data: docs,
  });
};

export const createUserController = async (req, res, next) => {
  try {
    let body = req.body;

    const docs = await createUserService({
      username: body?.username,
      email: body?.email,
      password: body?.password,
    });

    return res.status(201).json({
      success: true,
      data: docs,
    });
  } catch (error) {
    console.log(error);
    if (error?.status === 400) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: false,
      message: error.toString(),
    });
  }
};

export const singinUserController = async (req, res, next) => {
  try {
    const user = await signinUserService(req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ success: false, message: error.message });
    } else {
      res.status(400).json({ success: false, message: error.toString() });
    }
  }
};
