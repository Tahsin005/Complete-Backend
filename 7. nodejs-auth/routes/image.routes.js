const express = require('express');
const router = express.Router();
const { uploadImage, fetchImages } = require('../controllers/image.controllers.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const adminMiddleware = require("../middlewares/admin.middleware.js");
const uploadMiddleware = require('../middlewares/upload.middleware.js');

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImage);
router.get('/images', authMiddleware, fetchImages);


module.exports = router;