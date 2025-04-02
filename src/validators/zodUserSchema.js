import { z } from "zod";

export const zodUserSchema = z.object({
  username: z
    .string({ message: "username is required!" })
    .min(3, "user name must be have least 3 chars!")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "username can oonly contain alphanumeric characters"
    )
    .toLowerCase(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    ),
  email: z.string().email({ message: "Invalid email address" }).min(5),
});
