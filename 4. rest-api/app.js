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

app.post("/add", (req, res) => {
    const newBook = {
        id: Math.floor(Math.random() * 1000).toString(),
        title: `Book ${Math.floor(Math.random() * 1000)}`,
    };

    books.push(newBook);
    res.status(200).json({
        data: newBook,
        message: "New book is added successfully",
    });
});

app.put("/update/:id", (req, res) => {
    const findCurrentBook = books.find(
        (bookItem) => bookItem.id === req.params.id
    );
    if (findCurrentBook) {
        findCurrentBook.title = req.body.title || findCurrentBook.title;

        res.status(200).json({
            message: `Book with ID ${req.params.id} updated successfully`,
            data: findCurrentBook,
        });
    } else {
        res.status(404).json({
            message: "Book not found",
        });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});