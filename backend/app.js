const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
//get api testing route
app.get('/', (req, res) => {
    res.send('Welcome to Hyperidial AI Backend!');
});

const PORT = process.env.PORT || 87 ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});