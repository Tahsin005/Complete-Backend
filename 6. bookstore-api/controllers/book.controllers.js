const Book = require("../models/book.models.js");

const getAllBooks = async (req, res) => {};

const getBookById = async (req, res) => {};

const addNewBook = async (req, res) => {
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);
        if (newBookFormData) {
            res.status(201).json({
                success: true,
                message: "Book added successfully",
                data: newlyCreatedBook,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    }
};

const updateBookById = async (req, res) => {};

const deleteBookById = async (req, res) => {};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
};
