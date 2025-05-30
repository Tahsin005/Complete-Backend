const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBookById
} = require('../controllers/book.controllers.js');


// all the routes
router.get('/get', getAllBooks);
router.get('/get/:id', getBookById);
router.post('/add', addNewBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBookById);

module.exports = router;