import jwt from "jsonwebtoken";
const isloggedin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "Please login first" });
  }
  try {
    const isverified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = isverified;

    
    next();
  } catch (err) {
    res.json({ success: false, message: "Something went wrong" });
  }
};
export default isloggedin;
