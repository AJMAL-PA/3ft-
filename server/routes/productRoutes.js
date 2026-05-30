const express = require('express');
const router = express.Router();
const {
  getProducts,
  getFeaturedProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getStats,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public routes — specific named routes MUST come before :id param
router.get('/featured', getFeaturedProducts);

// Admin stats — MUST come before :id param
router.get('/admin/stats', protect, getStats);

router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin protected routes
router.post('/', protect, upload.array('images', 10), createProduct);
router.put('/:id', protect, upload.array('images', 10), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
