import jwt from "jsonwebtoken";

export const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

export const verifyJwtToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return { status: 400, message: "Invalid token" };
  }
};
