import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: [
    {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  ],
  video:{
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
const Post = mongoose.model("Post", postSchema);
export default Post;
