const express = require('express');
const customMiddleware = require('./custom-middleware');

const app = express();

const myMiddleware = (req, res, next) => {
    console.log('Middleware executed at', Date.now());
    next();
};

app.use(customMiddleware);
app.use(myMiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.get('/products', (req, res) => {
    res.json([
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
    ]);
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const products = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
    ];

    const getSingleProduct = products.find(product => product.id === parseInt(productId));
    if (getSingleProduct) {
        res.json(getSingleProduct);
    } else {
        res.status(404).send('Product not found');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});