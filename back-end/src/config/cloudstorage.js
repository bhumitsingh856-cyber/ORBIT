import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");
    return {
      folder: isVideo ? "orbit/video" : "orbit/image",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo
        ? ["mp4", "webm"]
        : ["jpg", "jpeg", "png", "webp"],
      transformation: isVideo
        ? [{ width: 720, crop: "limit", quality: "auto", fetch_formate: "auto", }]
        : [{ width: 1080, height: 1080, crop: "limit", quality: "auto" }],
    };
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

export default upload;
