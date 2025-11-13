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

export const deleteComment = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res
      .status(404)
      .json({ success: false, message: "Comment not found" });
  }

  if (comment.user.toString() !== userId.toString()) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  await comment.deleteOne();

  return res.json({ success: true, message: "Comment deleted" });
});
