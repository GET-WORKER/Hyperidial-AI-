const express = require("express");
const router = express.Router();
const { makeCall } = require("../Services/callfun");
const numbers = require("../Services/numbers.json");

// Route to call all numbers in JSON
router.post("/call", async (req, res) => {
  try {
    let results = [];

    for (let num of numbers.contacts) {
      const call = await makeCall(
        num, 
        process.env.TWILIO_PHONE_NUMBER, 
        "Hello, this is a test call from Twilio!"
      );
      results.push({ number: num, sid: call.sid });
    }

    res.json({ message: "Calls initiated", results });
  } catch (error) {
    console.error("Error calling:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;