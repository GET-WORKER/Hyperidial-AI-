
/*
import fs from "fs";
import path from "path";
import openai from "../config/openaiconfig.js"; // ✅ uses your config

// --- Transcribe from a FILE ---
export async function transcribeAudio(filePath) {
  try {
    const resolvedPath = path.resolve(filePath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`❌ Audio file not found: ${resolvedPath}`);
    }

    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(resolvedPath),
      model: "gpt-4o-mini-transcribe", // ✅ cheaper model
      language: "en",
    });

    return response.text;
  } catch (error) {
    console.error("❌ Error in transcribeAudio:", error.message);
    throw error;
  }
}

// --- Transcribe from a STREAM (future Twilio integration) ---
export async function transcribeStream(audioStream) {
  try {
    const response = await openai.audio.transcriptions.create({
      file: audioStream,
      model: "gpt-4o-mini-transcribe",
      language: "en",
    });

    return response.text;
  } catch (error) {
    console.error("❌ Error in transcribeStream:", error.message);
    throw error;
  }
}
*/