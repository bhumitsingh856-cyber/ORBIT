import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import db from "./config/database.js";
import authroutes from "./routes/authroutes.js";
import getpostsroute from "./routes/getpost.js";
import usercontext from "./routes/getuser.js";
import cookieParser from "cookie-parser";
import story from "./routes/story.js";
import getprofileroute from "./routes/getprofile.js";
import createpostroute from "./routes/createpost.js";
import searchRouter from "./routes/search.js";
import messageRouter from "./routes/message.js";
import chatlistRouter from "./routes/chatlist.js";
import textRouter from "./OrbitAi/orbitai.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket/socket.js";
db();
const app = express();
const port =process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.REACT_URL,
    credentials: true,
  },
});
initializeSocket(io);
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authroutes);
app.use("/auth", usercontext);
app.use("/orbit", createpostroute);
app.use("/orbit", getpostsroute);
app.use("/orbit", getprofileroute);
app.use("/orbit", story);
app.use("/orbit", searchRouter);
app.use("/orbit", textRouter);
app.use("/orbit", chatlistRouter);
app.use("/orbit", messageRouter);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
