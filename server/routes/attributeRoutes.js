const express = require('express');
const router = express.Router();
const {
  getAttributes,
  getAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} = require('../controllers/attributeController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAttributes);
router.get('/:id', getAttribute);

// Admin protected routes
router.post('/', protect, createAttribute);
router.put('/:id', protect, updateAttribute);
router.delete('/:id', protect, deleteAttribute);

module.exports = router;
