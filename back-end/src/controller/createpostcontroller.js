import Post from "../models/post.js";
import User from "../models/user.js";
const newpost = async (req, res) => {
  try {
    if (req.files.length>10) {
      return res.json({ success: false, message: "You can upload maximum 10 images" }); 
    }
    const id = req.user._id;
    const image=req.files?.image || [];
    const video=req.files?.video?.[0];
    const user = await User.findById(id);
    const post = await Post.create({
      user: user._id,
      content: req.body.caption,
      image: image.map((e) => ({ url: e.path, public_id: e.filename })) ,
      video: video ? { url: video.path, public_id: video.filename } : null
    });
    user.posts.push(post._id);
    await user.save();
    res.json({ success: true, message: "Post created successfully" });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};

export default { newpost };
