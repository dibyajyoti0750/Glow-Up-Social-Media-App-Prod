import mongoose from "mongoose";
import Comment from "./Comment.js";

const postSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    content: { type: String },
    image_urls: [{ type: String }],
    post_type: {
      type: String,
      enum: ["text", "image", "text_with_image"],
      required: true,
    },
    likes_count: [{ type: String, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true, minimize: false }
);

postSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const postId = this._id;

    try {
      await Comment.deleteMany({ post: postId });
      next();
    } catch (err) {
      next(err);
    }
  }
);

export default mongoose.model("Post", postSchema);
