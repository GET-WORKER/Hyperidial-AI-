const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());


const twilioRoutes = require("./Routes/twilioCallRoutes")
app.use("/twilio", twilioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
