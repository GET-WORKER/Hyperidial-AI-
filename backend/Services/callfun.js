const twilio = require("twilio");
const numbers = require("./numbers.json");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function makeCall() {
  try {
    for (const to of numbers.contacts) {
      console.log("📞 Making call to:", to);

      const call = await client.calls.create({
        to: to,  
        from: process.env.TWILIO_PHONE_NUMBER || "+12314989996", // prefer .env
        twiml: `<Response><Say voice="alice">Hello, this is a test call from Hyperidial.</Say></Response>`
      });

      console.log("✅ Call initiated:", call.sid);
    }
  } catch (error) {
    console.error("❌ Error making call:", error.message);
    throw error;
  }
}
makeCall();
// Export the function so routes can use it
module.exports = { makeCall };
