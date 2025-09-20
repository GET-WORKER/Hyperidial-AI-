import { transcribeAudio } from "./Services/sttService.js";

const test = async () => {
  try {
    const text = await transcribeAudio("audio/sample.mp3"); // adjust path
    console.log("✅ Transcribed Text:", text);
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  }
};

test();
