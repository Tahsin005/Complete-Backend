const express = require('express');
const app = express();

// middleware
app.use(express.json());

let books = [
    {
        id: "1",
        title: "Book 1",
    },
    {
        id: "2",
        title: "Book 2",
    },
];

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to our bookstore api",
    });
});

app.get("/get", (req, res) => {
    res.json(books);
});

const port = 3000;

app.listen(port, () => {
    console.log("server is running on port", port);
});
