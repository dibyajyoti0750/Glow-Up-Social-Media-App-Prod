import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
