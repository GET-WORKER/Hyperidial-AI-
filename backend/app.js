const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

// ✅ Correct import
const twilioRoutes = require("./twilioroutes/twilioCallRoutes");

// ✅ Use same variable name here
app.use("/twilio", twilioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
