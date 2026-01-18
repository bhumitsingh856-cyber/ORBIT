import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
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
    video: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    caption: {
      type: String,
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 1000 * 60 * 60 * 24,
      index: { expires: 0 },
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
