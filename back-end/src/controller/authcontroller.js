import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
const signup = async (req, res) => {
  try {
    const { name, age, username, email, password } = req.body;
    const isUserExist = await User.findOne({
      username: username,
    });
    if (isUserExist) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      user: name,
      password: hash,
      email: email,
      age: age,
    });
    const token = jwt.sign(
      { email: email, username: username },
      process.env.JWT_SECRET,
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username }).select(
      "+password",
    );
    if (!existingUser) {
      return res.json({ success: false, message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Something went wrong" });
    }
    const token = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.json({ success: true, message: "Login successful", user: username });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};
const resetpass = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.json({ success: false, message: "Invalid username" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();
    const resetLink = `${process.env.REACT_URL}/auth/setnewpass/${username}/${token}`;
    // const testaccount=await nodemailer.createTestAccount()
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAIL_GMAIL,
        pass: process.env.NODEMAIL_PASS,
      },
      // host:"smtp.ethereal.email",
      // port:587,
      // auth:{
      //   user:testaccount.user,
      //   pass:testaccount.pass
      // }
    });

    const info = await transporter.sendMail({
      to: email,
      subject: "Orbit - Reset password",
      html: `<h2>Hi ${user.user} Welcome to Orbit</h2>
    <h3>Click link below to reset your password</h3>
    <a href=${resetLink}>resetOrbitPassword${token}</a>`,
    });
    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};
const setnewpass = async (req, res) => {
  const { username, token, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "Invalid username" });
    }
    if (user.resetPasswordToken !== token) {
      return res.json({ success: false, message: "Invalid token" });
    }
    if (user.resetPasswordTokenExpireAt < Date.now()) {
      return res.json({ success: false, message: "Token expired" });
    }
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;
    await user.save();
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};
export default { signup, login, logout, resetpass, setnewpass };
