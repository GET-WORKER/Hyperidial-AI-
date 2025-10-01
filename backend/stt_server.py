import asyncio
import websockets
import json
import whisper
import tempfile
import os

# ✅ Load Whisper model once at startup (base = fast + accurate)
print("🔁 Loading Whisper model...")
model = whisper.load_model("base")
print("✅ Whisper model loaded successfully.")

# ✅ Handle audio chunks from client
async def transcribe(websocket):
    print("✅ Client connected to STT WebSocket")

    try:
        async for message in websocket:
            data = json.loads(message)

            if "audio" in data:
                audio_bytes = bytes(data["audio"])
                # Save chunk temporarily
                with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_audio:
                    tmp_audio.write(audio_bytes)
                    tmp_audio_path = tmp_audio.name

                # 🔊 Transcribe audio chunk
                result = model.transcribe(tmp_audio_path, language="en")
                text = result.get("text", "").strip()
                print(f"🧠 Transcribed text: {text}")

                # Send back to Node.js
                await websocket.send(json.dumps({"text": text}))

                # Clean up temp file
                os.remove(tmp_audio_path)

            elif "ping" in data:
                await websocket.send(json.dumps({"pong": True}))

    except websockets.exceptions.ConnectionClosedError:
        print("⚠️ Client disconnected")
    except Exception as e:
        print(f"❌ Error during transcription: {e}")

# ✅ Start WebSocket server
async def main():
    print("🚀 Starting STT WebSocket server on ws://localhost:5005")
    async with websockets.serve(transcribe, "0.0.0.0", 5005):
        await asyncio.Future()  # keep running

if __name__ == "__main__":
    asyncio.run(main())
