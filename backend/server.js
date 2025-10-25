import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
const app = express();
await connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.json("server is running"));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/story", storyRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 8080;

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ success: false, message });
});

app.listen(PORT, () => console.log("server is listening on port", PORT));
