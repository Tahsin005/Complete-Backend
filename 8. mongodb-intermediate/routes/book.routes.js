const express = require("express");
const {
    createAuthor,
    createBook,
} = require("../controllers/book.controllers.js");

const router = express.Router();

router.post('/author', createAuthor);
router.post('/book', createBook);

module.exports = router;
