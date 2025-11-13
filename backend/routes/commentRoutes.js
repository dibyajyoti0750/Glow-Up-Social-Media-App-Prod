import express from "express";
import { protect } from "../middlewares/auth.js";
import { addComment, deleteComment } from "../controllers/commentController.js";
const commentRouter = express.Router();

commentRouter.post("/add", protect, addComment);
commentRouter.delete("/delete/:commentId", protect, deleteComment);

export default commentRouter;
