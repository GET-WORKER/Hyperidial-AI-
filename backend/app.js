require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send SMS using Twilio
async function sendSMS(to, message) {
  try {
    const message = await client.messages.create({
      body:'i am Hyperidial,am contacting you for the purpose of balance payment the loan amount you borrowed from us the due date is on 5-11-2025',
      from: '+12314989996', // our Twilio phone number
      to:"+917708288215"// Recipient's phone number
    });

    console.log("✅ Message sent with SID:", msg.sid);
    return msg; 
  } catch (error) {
    console.error("❌ Error sending SMS:", error.message);
    throw error; 
  }
}

sendSMS();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to Hyperidial AI Backend!');
});


const PORT = process.env.PORT || 87;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
