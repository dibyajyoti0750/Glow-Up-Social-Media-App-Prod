import express from "express";
import {
  getChatMessages,
  getLatestMessages,
  sendMessage,
  sseController,
} from "../controllers/messageController.js";
import { upload } from "../config/multer.js";
import { protect } from "../middlewares/auth.js";
const messageRouter = express.Router();

messageRouter.get("/latest", protect, getLatestMessages);
messageRouter.post("/send", protect, upload.single("image"), sendMessage);
messageRouter.post("/get", protect, getChatMessages);
messageRouter.get("/:userId", sseController);

export default messageRouter;
