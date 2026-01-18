import { GoogleGenAI } from "@google/genai"; 
import "dotenv/config";
const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
async function genText(str) {
  try {
    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: str,
    });
    return response.text;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
export default genText;