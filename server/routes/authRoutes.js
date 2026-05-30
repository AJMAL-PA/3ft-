const express = require('express');
const router = express.Router();
const { login, verify, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/verify', protect, verify);
router.post('/logout', protect, logout);

module.exports = router;
