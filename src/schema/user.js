import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "User name is required!"],
      minlength: [3, "User name must be at least 3 characters long!"],
      maxlength: [20, "User name must be at most 20 characters long!"],
      match: [
        /^[a-zA-Z0-9]+$/,
        "User name can only contain alphanumeric characters!",
      ],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email is required!"],
      validate: {
        validator: function (v) {
          return (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address".test(v)
          );
        },
        message: "Invalid email format!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters long!"],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
      },
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const user = mongoose.model("User", userSchema);

export default user;
