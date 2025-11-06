import wrapAsync from "../middlewares/wrapAsync.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addComment = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { text, postId } = req.body;

  if (!text?.trim() || !postId) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const comment = await Comment.create({
    user: userId,
    post: postId,
    comment: text.trim(),
  });

  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

  const populatedComment = await comment.populate("user");

  return res.status(201).json({
    success: true,
    message: "Comment added successfully",
    comment: populatedComment,
  });
});
