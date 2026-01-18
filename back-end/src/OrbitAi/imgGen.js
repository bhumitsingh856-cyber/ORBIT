import { InferenceClient } from "@huggingface/inference";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import "../config/cloudstorage.js"; 

const client = new InferenceClient(process.env.ACCESS_TOKEN);
async function generateAndUpload(prompt) {
  try {
    const response = await client.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: { num_inference_steps: 5 },
    });

    // 1. Convert the response Blob to an ArrayBuffer 
    const arrayBuffer = await response.arrayBuffer();

    // 2. IMPORTANT: Convert ArrayBuffer to a Node.js Buffer to use .toString("base64")
    const base64Image = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

    // 3. Upload to Cloudinary using your existing account
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "orbit/AIGENimage",
      transformation: [
        { width: 1080, height: 1080, crop: "limit", quality: "auto" },
      ],
    });
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error during generation or upload:", error);
  }
} 
export default generateAndUpload;