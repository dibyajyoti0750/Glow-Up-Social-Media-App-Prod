import wrapAsync from "../middlewares/wrapAsync.js";
import User from "../models/User.js";
import ExpressError from "../utils/ExpressError.js";
import imagekit from "../config/imagekit.js";
import fs from "fs";

// Get user data
export const getUserData = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const user = await User.findById(userId);

  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  return res.json({ success: true, user });
});

// Update user data
export const updateUserData = wrapAsync(async (req, res) => {
  const { userId } = req.auth();

  let { username, bio, location, full_name } = req.body;

  const tempUser = await User.findById(userId);

  // Fallback to existing values
  if (!username) username = tempUser.username;

  if (tempUser.username !== username) {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      username = tempUser.username;
    }
  }

  const updatedData = {
    username,
    bio,
    location,
    full_name,
  };

  // if req.files exists and has a profile property & if that property is an array, take the first element safely
  const profile = req.files?.profile?.[0];
  const cover = req.files?.cover?.[0];

  if (profile) {
    const buffer = fs.readFileSync(profile.path);
    const response = await imagekit.upload({
      file: buffer,
      fileName: profile.originalname,
    });

    const url = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "512" },
      ],
    });

    updatedData.profile_picture = url;
  }

  if (cover) {
    const buffer = fs.readFileSync(cover.path);
    const response = await imagekit.upload({
      file: buffer,
      fileName: cover.originalname,
    });

    const url = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    updatedData.cover_photo = url;
  }

  const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

  return res.json({
    success: true,
    user,
    message: "Profile updated successfully",
  });
});

// Search users
export const discoverUsers = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { input } = req.body;

  const allUsers = await User.find({
    $or: [
      { username: { $regex: input, $options: "i" } },
      { full_name: { $regex: input, $options: "i" } },
      { email: { $regex: input, $options: "i" } },
      { location: { $regex: input, $options: "i" } },
    ],
  });

  const filteredUsers = allUsers.filter((user) => user._id !== userId);

  return res.json({ success: true, users: filteredUsers });
});

// Todo => followUser function
