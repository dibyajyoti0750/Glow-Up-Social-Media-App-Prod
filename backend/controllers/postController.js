import imagekit from "../config/imageKit.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import fs from "fs";
import Post from "../models/Post.js";
import User from "../models/User.js";

// Add post
export const addPost = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { content, post_type } = req.body;
  const images = req.files || [];

  let image_urls = [];

  if (images.length > 0) {
    image_urls = await Promise.all(
      images.map(async (image) => {
        const fileBuffer = fs.readFileSync(image.path);
        const response = await imagekit.upload({
          file: fileBuffer,
          fileName: image.originalname,
          folder: "glowup-posts",
        });

        const url = imagekit.url({
          path: response.filePath,
          transformation: [
            { quality: "auto" },
            { format: "webp" },
            { width: "1280" },
          ],
        });

        return url;
      })
    );
  }

  await Post.create({
    user: userId,
    content,
    image_urls,
    post_type,
  });

  return res.json({ success: true, message: "Your post was sent" });
});

// Get posts
export const getFeedPosts = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const user = await User.findById(userId);

  const userIds = [userId, ...user.connections, ...user.following];

  // user can see their own posts and the posts of users they are connected to or following
  const posts = await Post.find({ user: { $in: userIds } })
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } })
    .sort("-createdAt");

  res.json({ success: true, posts });
});

// Like post
export const likePost = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { postId } = req.body;

  const post = await Post.findById(postId);

  if (post.likes_count.includes(userId)) {
    post.likes_count = post.likes_count.filter((user) => user !== userId);
    await post.save();
    return res.json({ success: true, message: "Post unliked", post });
  } else {
    post.likes_count.push(userId);
    await post.save();
    return res.json({ success: true, message: "Post liked", post });
  }
});

// Delete post
export const deletePost = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  if (post.user.toString() !== userId.toString()) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  await post.deleteOne();

  return res.json({ success: true, message: "Post deleted" });
});
