require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes.js');
const bookRoutes = require('./routes/book.routes.js');

const app = express();

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb connected successfully..."))
  .catch((e) => console.log(e));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});