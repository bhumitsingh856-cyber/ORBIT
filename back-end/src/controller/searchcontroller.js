import User from "../models/user.js";
const getsearch = async (req, res) => {
  const uesr = req.params.search;
  try {
    const users = await User.find({
      username: { $regex: uesr, $options: "i" },
    }).select("username user profilePicture");
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};
const getrandom = async (req, res) => {
  try {
    const users = await User.aggregate([{ $sample: { size: 10 }},{$project:{user:1,username:1,profilePicture:1}}]);
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};
export default { getsearch ,getrandom};
