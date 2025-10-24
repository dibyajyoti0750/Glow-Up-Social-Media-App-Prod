import express from "express";
import { protect } from "../middlewares/auth.js";
import { addUserStory, getStories } from "../controllers/storyController.js";
import { upload } from "../config/multer.js";
const storyRouter = express.Router();

storyRouter.get("/get", protect, getStories);
storyRouter.post("/create", protect, upload.single("media"), addUserStory);

export default storyRouter;
