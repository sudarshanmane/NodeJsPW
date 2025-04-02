import { findUserByEmail } from "../repositories/userRepository.js";
import { verifyJwtToken } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required." });
  }

  try {
    const response = verifyJwtToken(token);

    if (response?.status === 400 || !response?.email) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Token!" });
    }

    const user = await findUserByEmail(response.email);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Token!" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "Invalid Token!" });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req?.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Unothorized" });
  }

  next();
};
