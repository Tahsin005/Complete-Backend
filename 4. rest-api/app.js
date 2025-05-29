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

app.get("/get/:id", (req, res) => {
    const book = books.find((item) => item.id === req.params.id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({
            message: "Book not found! Please try with a different Book ID",
        });
    }
});

const port = 3000;

app.listen(port, () => {
    console.log("server is running on port", port);
});
