import express from "express";
import Post from "../models/post.js";

const getallposts = async (req, res) => {
  const posts = await Post.find({})
    .populate("user", "username user profilePicture")
    .populate("comments.user", "username user profilePicture")
    .sort({ createdAt: -1 });
  if (!posts) return res.json({ message: "No posts found" });
  res.json(posts);
};
const comment = async (req, res) => {
  const postId = req.params.id;
  const comment = req.body.comment;
  try {
    const post = await Post.findById(postId);
    post.comments.push({ user: req.user._id, content: comment });
    await post.save();
    await post.populate("comments.user", "username user profilePicture");
    res.json({ comments: post.comments });
  } catch (err) {
    console.log(err);
  }
};
const deletecomment = async (req, res) => {
  const commentid = req.params.commentid;
  const postid = req.params.id;

  try {
    const post = await Post.findById(postid);
    post.comments.pull(commentid);
    await post.populate("comments.user", "username user profilePicture");
    await post.save();
    res.json({
      success: true,
      comments: post.comments,
      message: "Comment deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.json({ success: false, message: "Internal server error" });
  }
};
export default { getallposts, comment, deletecomment };
