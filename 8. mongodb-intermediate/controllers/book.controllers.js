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

const getBookByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;

        const books = await Book.find({ author: authorId }).populate('author');

        if (!books || books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No books found for this author",
            });
        }

        res.status(200).json({
            success: true,
            data: books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
}

module.exports = { createAuthor, createBook, getBookByAuthor };