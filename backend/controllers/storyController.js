import imagekit from "../config/imageKit.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import fs from "fs";
import Story from "../models/Story.js";
import User from "../models/User.js";
import { inngest } from "../inngest/index.js";

// Add story
export const addUserStory = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { content, media_type, background_color } = req.body;
  const media = req.file;
  let media_url = "";

  // upload media to imagekit
  if (media_type === "image" || media_type === "video") {
    const fileBuffer = fs.readFileSync(media.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: media.originalname,
    });
    media_url = response.url;
  }

  // create story
  const story = await Story.create({
    user: userId,
    content,
    media_type,
    background_color,
    media_url,
  });

  // schedule story deletion
  await inngest.send({
    name: "app/story.delete",
    data: { storyId: story._id },
  });

  return res.json({ success: true });
});

// Get user stories
export const getStories = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const user = await User.findById(userId);

  // user connections & followings
  const userIds = [userId, ...user.connections, ...user.following];

  const stories = await Story.find({
    user: { $in: userIds },
  })
    .populate("user")
    .sort({ createdAt: -1 });

  return res.json({ success: true, stories });
});

export const updateStoryViewCount = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { storyId } = req.body;

  const story = await Story.findById(storyId);
  if (!story) {
    return res.json({ success: false, message: "Story not found" });
  }

  if (!story.views_count.includes(userId)) {
    story.views_count.push(userId);
    await story.save();
  }

  return res.json({ success: true, message: "View updated" });
});
