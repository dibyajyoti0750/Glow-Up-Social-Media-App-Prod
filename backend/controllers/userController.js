import wrapAsync from "../middlewares/wrapAsync";
import User from "../models/User";
import ExpressError from "../utils/ExpressError";

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

  // todo--> upload images to imagekit
});
