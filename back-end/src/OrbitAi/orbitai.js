import express from "express";
import { Router } from "express";
import genText from "./aiconfig.js";
import generateAndUpload from "./imgGen.js";
import OrbitAi from "../models/orbitai.js";
import isloggedin from "../middlewares/authrise.js";

const textRouter = Router();

textRouter.get("/getOrbitAiMessage", isloggedin, async (req, res) => {
  try {
    const chatExist = await OrbitAi.findOne({ user: req.user._id });
    if (!chatExist) {
      const chat = await OrbitAi.create({
        user: req.user._id,
        message: [],
      });
      return res.json(chat);
    }
    res.json(chatExist);
  } catch (error) {
    res.json({ error: error.message });
  }
});

textRouter.post("/genOrbit", isloggedin, async (req, res) => {
  const { prompt } = req.body;
  try {
    const chat = await OrbitAi.findOne({ user: req.user._id });
    const response = await genText(prompt);
    chat.message.push({
      role: "user",
      content: prompt,
    });
    const resAi = {
      role: "ai",
      content: response,
      createdAt: new Date(),
    };
    chat.lastMessage = response;
    chat.message.push(resAi);
    await chat.save();

    res.json(resAi);
  } catch (error) {
    res.json({ error: error.message });
  }
});
textRouter.post("/generateImage", isloggedin, async (req, res) => {
  console.log(req.body);
  const { prompt } = req.body;
  try {
    const chat = await OrbitAi.findOne({ user: req.user._id });
    const response = await generateAndUpload(prompt);
    const resAi = {
      role: "ai",
      image: response,
      createdAt: new Date(),
    };
    chat.message.push({
      role: "user",
      content: prompt,
    });
    chat.lastMessage = prompt;
    chat.message.push(resAi);
    await chat.save();
    res.json(resAi);
  } catch (err) {
    res.json({ error:"Internal server error" });
  }
});

export default textRouter;
