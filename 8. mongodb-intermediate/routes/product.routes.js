const express = require('express');
const router = express.Router();
const { insertSampleProducts } = require('../controllers/product.controllers.js');

router.post('/add', insertSampleProducts);

module.exports = router;