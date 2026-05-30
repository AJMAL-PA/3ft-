const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Admin protected routes
router.post('/', protect, upload.single('image'), createCategory);
router.put('/:id', protect, upload.single('image'), updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;
