import imagekit from "../config/imageKit.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import fs from "fs";
import Message from "../models/Message.js";

// Create an empty obj to store the SS event connections
const connections = {};

// Controller function for the SSE endpoint
export const sseController = (req, res) => {
  const { userId } = req.params;
  console.log("New client connected:", userId);

  // set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // add the client's response obj to the connection obj
  connections[userId] = res;

  // send an initial event to the client
  res.write("log: Connected to SSE stream\n\n");

  // handle client disconnection
  req.on("close", () => {
    // remove the client's response obj from the connections array
    delete connections[userId];
    console.log("Client disconnected");
  });
};

// Send message
export const sendMessage = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { to_user_id, text } = req.body;
  const image = req.file;

  let media_url = "";
  let message_type = image ? "image" : "text";

  if (message_type === "image") {
    const fileBuffer = fs.readFileSync(image.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: image.originalname,
    });

    media_url = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });
  }

  const message = await Message.create({
    from_user_id: userId,
    to_user_id,
    text,
    message_type,
    media_url,
  });

  res.json({ success: true, message });

  // send message to to_user_id using SSE
  const messageWithUserData = await Message.findById(message._id).populate(
    "from_user_id"
  );

  if (connections[to_user_id]) {
    connections[to_user_id].write(
      `data: ${JSON.stringify(messageWithUserData)}\n\n`
    );
  }
});

export const sharePost = wrapAsync(async (req, res) => {
  const { userId: from_user_id } = req.auth();
  const { to_user_id, postId } = req.body;

  // create the message
  const message = await Message.create({
    from_user_id,
    to_user_id,
    message_type: "post_share",
    post: postId,
  });

  // send response back to sender immediately
  res.json({ success: true, message });

  // populate user data
  const messageWithUserData = await Message.findById(message._id)
    .populate("from_user_id")
    .populate("post", "content image_urls _id");

  // send it in real time to the receiver using sse
  if (connections[to_user_id]) {
    connections[to_user_id].write(
      `data: ${JSON.stringify(messageWithUserData)}\n\n`
    );
  }
});

// Get chat messages
export const getChatMessages = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const { to_user_id } = req.body;

  const messages = await Message.find({
    $or: [
      { from_user_id: userId, to_user_id },
      { from_user_id: to_user_id, to_user_id: userId },
    ],
  })
    .sort("-createdAt")
    .populate("post", "image_urls content _id");

  // mark messages as seen
  await Message.updateMany(
    { from_user_id: to_user_id, to_user_id: userId },
    { seen: true }
  );

  return res.json({ success: true, messages });
});

export const getUserRecentMessages = wrapAsync(async (req, res) => {
  const { userId } = req.auth();
  const messages = await Message.find({ to_user_id: userId })
    .populate("from_user_id to_user_id")
    .sort({ createdAt: -1 });

  return res.json({ success: true, messages });
});

export const getLatestMessages = wrapAsync(async (req, res) => {
  const { userId } = req.auth();

  const messages = await Message.find({
    $or: [{ to_user_id: userId }, { from_user_id: userId }],
  }).sort("-createdAt");

  const latestByUser = messages.reduce((acc, msg) => {
    const from = msg.from_user_id.toString();
    const to = msg.to_user_id.toString();

    const otherUserId = from === userId ? to : from;

    if (!acc[otherUserId]) {
      acc[otherUserId] = msg;
    }

    return acc;
  }, {});

  return res.json({
    success: true,
    latestMessages: Object.values(latestByUser),
  });
});
