import express from "express";
import { protect } from "../middlewares/auth.js";
import { addComment } from "../controllers/commentController.js";
const commentRouter = express.Router();

commentRouter.post("/add", protect, addComment);

export default commentRouter;
