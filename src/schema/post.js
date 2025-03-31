import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
