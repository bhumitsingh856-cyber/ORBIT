import mongoose from "mongoose";

const orbitaischema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: [
      {
        role: {
          type: String,
          enum: ["user", "ai"],
          required: true,
        },
        content: {
          type: String,
        },
        image:{
          type:String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastMessage:{
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model("OrbitAi", orbitaischema);


