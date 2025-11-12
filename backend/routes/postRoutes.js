import express from "express";
import {
  addPost,
  deletePost,
  getFeedPosts,
  likePost,
} from "../controllers/postController.js";
import { upload } from "../config/multer.js";
import { protect } from "../middlewares/auth.js";
const postRouter = express.Router();

postRouter.get("/feed", protect, getFeedPosts);
postRouter.post("/add", protect, upload.array("images", 4), addPost);
postRouter.post("/like", protect, likePost);
postRouter.delete("/delete", protect, deletePost);

export default postRouter;
