import wrapAsync from "../middlewares/wrapAsync.js";
import User from "../models/User.js";
import ExpressError from "../utils/ExpressError.js";
import imagekit from "../config/imageKit.js";
import fs from "fs";
import Connection from "../models/Connection.js";
import { inngest } from "../inngest/index.js";
import Post from "../models/Post.js";

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

// Follow
export const followUser = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { id } = req.body;

  if (userId == id) {
    return res.json({ success: false, message: "You cannot follow yourself" });
  }

  const user = await User.findById(userId);

  if (user.following.includes(id)) {
    return res.json({
      success: false,
      message: "You're already following this user",
    });
  }

  user.following.push(id);
  await user.save();

  const toUser = await User.findById(id);
  toUser.followers.push(userId);
  await toUser.save();

  return res.json({
    success: true,
    message: `You're now following ${toUser.full_name}`,
  });
});

// Unfollow user
export const unfollowUser = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { id } = req.body;

  const user = await User.findById(userId);
  user.following = user.following.filter((followedId) => followedId !== id);
  await user.save();

  const toUser = await User.findById(id);
  toUser.followers = toUser.followers.filter(
    (followerId) => followerId !== userId
  );
  await toUser.save();

  return res.json({
    success: true,
    message: "You're no longer following this user",
  });
});

// Send connection request
export const sendConnectionRequest = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { id } = req.body;

  // check if user has sent more than 20 connection requests in the last 24 hours
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const connectionRequests = await Connection.find({
    from_user_id: userId,
    createdAt: { $gt: last24Hours },
  });

  if (connectionRequests.length >= 20) {
    return res.json({
      success: false,
      message:
        "You have sent more than 20 connection requests in the last 24 hours",
    });
  }

  // check if users are already connected
  const connection = await Connection.findOne({
    $or: [
      { from_user_id: userId, to_user_id: id },
      { from_user_id: id, to_user_id: userId },
    ],
  });

  if (!connection) {
    const newConnection = await Connection.create({
      from_user_id: userId,
      to_user_id: id,
    });

    await inngest.send({
      name: "app/connection-request",
      data: { connectionId: newConnection._id },
    });

    return res.json({
      success: true,
      message: "Connection request sent successfully",
    });
  } else if (connection && connection.status === "accepted") {
    return res.json({
      success: false,
      message: "You are already connected with this user",
    });
  }

  return res.json({ success: false, message: "Connection request pending!" });
});

// Get user connections
export const getUserConnections = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const user = await User.findById(userId).populate(
    "connections followers following"
  );

  const connections = user.connections;
  const followers = user.followers;
  const following = user.following;

  const pendingConnections = (
    await Connection.find({ to_user_id: userId, status: "pending" }).populate(
      "from_user_id"
    )
  ).map((connection) => connection.from_user_id);

  return res.json({
    success: true,
    connections,
    followers,
    following,
    pendingConnections,
  });
});

// Accept connection request
export const acceptConnectionRequest = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { id } = req.body;

  const connection = await Connection.findOne({
    from_user_id: id,
    to_user_id: userId,
  });

  if (!connection) {
    return res.json({ success: false, message: "Connection not found" });
  }

  const user = await User.findById(userId);
  user.connections.push(id);
  await user.save();

  const toUser = await User.findById(id);
  toUser.connections.push(userId);
  await toUser.save();

  connection.status = "accepted";
  await connection.save();

  return res.json({ success: true, message: "Connection request accepted" });
});

// Get user profiles
export const getUserProfiles = wrapAsync(async (req, res) => {
  const { profileId } = req.body;
  const profile = await User.findById(profileId);

  if (!profile) {
    return res.json({ success: false, message: "Profile not found" });
  }

  const posts = await Post.find({ user: profileId })
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } })
    .sort("-createdAt");

  return res.json({ success: true, profile, posts });
});
