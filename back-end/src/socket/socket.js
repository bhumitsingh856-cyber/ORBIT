import messages from "../models/messages.js";
import ChatList from "../models/chatlist.js";
import { v2 as cloudinary } from "cloudinary";
const onlineUsers = new Map();
export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("username", (username) => {
      onlineUsers.set(username, socket.id);
      io.emit("onlineUsers", [...onlineUsers.keys()]);
    });
    socket.on("disconnect", () => {
      for (const [username, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          onlineUsers.delete(username);
          break;
        }
      }
      io.emit("onlineUsers", [...onlineUsers.keys()]);
    });
    socket.on("join room", (chatId) => { 
      socket.join(chatId);
    });
    socket.on("send", async ({ chatId, user, message, file }) => {
      const newMessage = await messages.findOne({ chatId }); 
      if (file) {
        // 2. IMPORTANT: Convert ArrayBuffer to a Node.js Buffer to use .toString("base64")
        const base64Image = `data:image/png;base64,${Buffer.from(file).toString(
          "base64"
        )}`;
        // 3. Upload to Cloudinary using your existing account
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
          folder: "orbit/chatImage",
          transformation: [
            { width: 1080, height: 1080, crop: "limit", quality: "auto" },
          ],
        });
        console.log(uploadResult);
        newMessage.message.push({
          user,
          message,
          image: uploadResult.secure_url,
        });
      } else {
        newMessage.message.push({ user, message });
      }
      await newMessage.save();
      const lastMessage = await ChatList.findById(chatId);
      lastMessage.lastMessage = message;
      await lastMessage.save();
      io.to(chatId).emit("receive", newMessage);
    });
    socket.on("typing", (chatId) => {
      socket.to(chatId).emit("typing");
    });
    socket.on("stop typing", (chatId) => {
      socket.to(chatId).emit("stop typing");
    });
  });
};
