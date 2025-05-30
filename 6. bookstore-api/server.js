require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/db.js');
const bookRoutes = require('./routes/book.routes.js');

const PORT = process.env.PORT || 3000;

// connect to the database
connectDB();

// middleware to parse JSON requests
app.use(express.json());

// routes
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});