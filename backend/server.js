import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
await connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json("server is running"));
app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("server is listening on port", PORT));
