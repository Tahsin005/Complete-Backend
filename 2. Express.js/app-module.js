const express = require('express');
const app = express();

// application level settings
app.set('view engine', 'ejs'); // Set the view engine to EJS


// routing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/data', (req, res) => {
    res.json({
        message: 'Data received successfully',
    })
});

// middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});