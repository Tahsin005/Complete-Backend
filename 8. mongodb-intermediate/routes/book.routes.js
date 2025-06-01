const express = require("express");
const {
    createAuthor,
    createBook,
    getBookByAuthor,
} = require("../controllers/book.controllers.js");

const router = express.Router();

router.post('/author', createAuthor);
router.post('/book', createBook);
router.get('/author/:authorId/books', getBookByAuthor);

module.exports = router;
