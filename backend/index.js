import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbconnection } from "./lib/db.js";

dotenv.config();
const app = express();
const port = process.env.port;

app.use(cookieParser()); // ✅ Middleware to parse cookies
app.use(express.json()); // ✅ Middleware to parse JSON request body
app.use("/api/auth", authRoutes); //This code is setting up middleware in your Express app. Here's how it works:
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log(`app listening on ${port}`);
  dbconnection();
});
