import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    from_user_id: { type: String, ref: "User", required: true },
    to_user_id: { type: String, ref: "User", required: true },
    text: { type: String, trim: true },
    message_type: { type: String, emum: ["text", "image", "post_share"] },
    media_url: { type: String },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model("Message", messageSchema);
