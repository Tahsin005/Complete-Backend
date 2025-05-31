const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/image.controllers.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const adminMiddleware = require("../middlewares/admin.middleware.js");

router.post('/upload', authMiddleware, adminMiddleware, uploadImage)

module.exports = router;