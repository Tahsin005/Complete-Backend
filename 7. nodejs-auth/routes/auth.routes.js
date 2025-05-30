const express = require('express');
const router = express.Router();
const { registerUser, loginUser, changePassword } = require('../controllers/auth.controllers.js');
const authMiddleware = require('../middlewares/auth.middleware.js');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;