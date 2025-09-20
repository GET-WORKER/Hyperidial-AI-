import whisper

# Load the Whisper model
model = whisper.load_model("base")  # you can also try "tiny" (faster) or "small" (more accurate)

# Transcribe your audio file
result = model.transcribe("audio/sample.wav")

print("🔹 Transcription result:")
print(result["text"])

