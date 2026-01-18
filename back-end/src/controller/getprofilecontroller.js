import User from "../models/user.js";
import Post from "../models/post.js";
const getprofile = async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  const post = await Post.find({ user }).populate(
    "user",
    "user username profilePicture"
  ).populate("comments.user","username user profilePicture");

  res.json({ user, post });
};
const getothersprofile = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username });
  const post = await Post.find({ user }).populate(
    "user",
    "user username profilePicture"
  ).populate("comments.user","user username profilePicture");
  res.json({ user, post });
};
const follow = async (req, res) => {
  const who = req.body.who;
  const whom = req.params.id;
  if (who == whom) return;
  const whofollowed = await User.findById(who).select("followings");
  const whomfollowed = await User.findById(whom).select("followers");
  if (whofollowed.followings.includes(whom)) {
    whofollowed.followings.pull(whom);
    whomfollowed.followers.pull(who);
  } else {
    whofollowed.followings.push(whom);
    whomfollowed.followers.push(who);
  }
  await whofollowed.save();
  await whomfollowed.save();
  res.json({
    success: true,
    followers: whomfollowed.followers,
    followings: whomfollowed.followings,
  });
};
const getfollowers = async (req, res) => {
  const username = req.params;
  if (username) {
    const user = await User.findOne(username)
      .select("followers")

      .populate("followers", "user username profilePicture followers");
    res.json({ success: true, user });
  }
};

const getfollowings = async (req, res) => {
  const username = req.params;
  if (username) {
    const user = await User.findOne(username)
      .select("followings")
      .populate("followings", "user username profilePicture followers");
    res.json({ success: true, user });
  }
};

const editprofile = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = JSON.parse(req.body.data);
    const user = await User.findById(userId);
    if (data.username !== user.username) {
      const avail = await User.findOne({ username: data.username });
      if (avail) {
        return res.json({ success: false, message: "Usrename already exists" });
      }
      user.username=data.username;
    }
    user.user = data.name;
    user.age = data.age;
    user.gender = data.gender;
    user.bio = data.Bio;
    if (req.file) {
      user.profilePicture.url = req.file.path;
      user.profilePicture.public_id = req.file.filename;
    }
    await user.save();
    res.json({ success: true,message: "Profile updated successfully" });
  } catch (error) {
    res.json({ success: false, message: "Internal server error !" });
  }
};
export default {
  getprofile,
  getothersprofile,
  follow,
  getfollowers,
  getfollowings,
  editprofile,
};
