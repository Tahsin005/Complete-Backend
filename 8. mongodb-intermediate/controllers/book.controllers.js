const Book = require('../models/book.models.js');
const Author = require('../models/author.models.js');

const createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save();

        res.status(201).json({
            success: true,
            data: author,
        });
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        
        res.status(201).json({
            success: true,
            data: book,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { createAuthor, createBook };