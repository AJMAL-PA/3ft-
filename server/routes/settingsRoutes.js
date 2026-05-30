const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

// Public route — frontend reads WhatsApp number
router.get('/', getSettings);

// Admin protected — update settings
router.put('/', protect, updateSettings);

module.exports = router;
