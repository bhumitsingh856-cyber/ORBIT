import Post from "../models/post.js";
import User from "../models/user.js";
const likepost = async (req, res) => {
  try {
    const id = req.user._id;
    const postid = req.params.id;
    const post = await Post.findById(postid);
    const user = await User.findById(id);
    if (post.likes.includes(user._id)) {
      post.likes.pull(user._id);
    } else {
      post.likes.push(user._id);
    }
    await post.save();
    res.json({
      likes: post.likes,
      success: true,
      message: "Post liked successfully",
    });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};
const editpost = async (req, res) => {
  const _id = req.params.id; 
  try {
    const post = await Post.findById(_id);
    post.content = req.body.caption;
    post.save();
    res.send({ success: true, message: "Post updated successfully" });
  } catch (err) {
    res.json({ success: false, message: "Failed to update Post" });
  }
};
export default { likepost, editpost };
