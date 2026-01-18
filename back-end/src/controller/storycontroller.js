import express from "express";
import Story from "../models/story.js";
import User from "../models/user.js";

const createstory = async (req, res) => {
  if (req.files && req.files.length > 10) {
    return res.json({ success: false, message: "Maximum 10 images allowed" });
  }
  try {
    const user = req.user._id;
    const image = req.files || [];
    const caption = req.body.caption;
    // const video=req.files?.video?.[0];
    const story = await Story.create({
      user: user,
      viewers: [],
      image: image.map((e) => ({ url: e.path, public_id: e.filename })),
      // video:video?{url:video.path,public_id:video.filename}:null
      caption: caption,
    });
    story.save();
    res.json({ success: true, message: "Story created successfully" });
  } catch (error) { 
    res.json({ success: false, message: "Internal server error" });
  }
};
const getstory = async (req, res) => {
  const user = req.user._id;
  const stories = await Story.find({})
    .populate("user", "username user profilePicture")
    .sort({ createdAt: -1 });
  res.json(stories);
};

const storyView = async (req, res) => {
  const storyId = req.params.id;
  try {
    const story = await Story.findById(storyId);
    if (!story.viewers.includes(req.body.user)) {
      story.viewers.push(req.body.user);
      await story.save();
      res.json({ views: story.viewers });
    }
  } catch (error) {
    console.log(error);
  }
};

const deletestory = async (req, res) => {
  try {
    const storyId = req.params.id;
    await Story.findByIdAndDelete(storyId);
    res.json({ success: true, message: "Story deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};
export default { createstory, getstory, storyView, deletestory };
