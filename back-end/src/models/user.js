import mongoose from "mongoose"; 
const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: false,
    trim:true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender:{
    type:String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select:false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  profilePicture: {
    url:{
      type: String,
      default: `${process.env.EXPRESS_URL}/default.jpg`,
    },
    public_id: {
      type: String,
      default: "",
    },
  },
  bio: {
    type: String,
    default: "",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
       
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
       
    },
  ],
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isEmailVerifiedToken: {
    type: String,
  },
  isEmailVerifiedTokenExpireAt: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpireAt: {
    type: Date,
  },
},{timestamps:true});
const User = mongoose.model("User", userSchema);
export default User;
