require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/db.js');

const PORT = process.env.PORT || 3000;

// connect to the database
connectDB();

// middleware to parse JSON requests
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});