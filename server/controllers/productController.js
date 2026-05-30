const Product = require('../models/Product');

const parseSizes = (sizesInput) => {
  if (!sizesInput) return ['S', 'M', 'L', 'XL'];
  try {
    const parsed = JSON.parse(sizesInput);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // Not a JSON string
  }
  if (typeof sizesInput === 'string') {
    return sizesInput.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (Array.isArray(sizesInput)) {
    return sizesInput;
  }
  return ['S', 'M', 'L', 'XL'];
};

// @desc    Get all products (with optional filters)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, sort, inStock, page = 1, limit = 100 } = req.query;

    const query = {};

    // Filter by category name (populate then filter, or filter by category ID)
    if (category && category !== 'All') {
      // We'll need to find the category first by name
      const Category = require('../models/Category');
      const cat = await Category.findOne({ name: { $regex: new RegExp(`^${category}$`, 'i') } });
      if (cat) query.category = cat._id;
      else {
        // Try matching by ID directly
        query.category = category;
      }
    }

    // Filter by stock
    if (inStock === 'true') query.inStock = true;

    // Text search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === 'priceLow') sortOption = { price: 1 };
    if (sort === 'priceHigh') sortOption = { price: -1 };
    if (sort === 'alphabetical') sortOption = { title: 1 };
    if (sort === 'featured') sortOption = { isFeatured: -1, createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate('category', 'name slug image')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, inStock: true })
      .populate('category', 'name slug')
      .limit(8)
      .sort({ createdAt: -1 });

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Admin
const createProduct = async (req, res) => {
  try {
    const { title, sku, price, category, description, isFeatured, inStock, productType, sizes, attributes } = req.body;

    if (!title || !sku || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, SKU, price, and category are required',
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Product image is required' });
    }

    const imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    const imageUrl = imageUrls[0];

    let parsedAttributes = [];
    if (productType === 'variable' && attributes) {
      try {
        parsedAttributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;
      } catch (e) {
        if (Array.isArray(attributes)) parsedAttributes = attributes;
      }
    }

    const product = await Product.create({
      title: title.trim(),
      sku: sku.trim().toUpperCase(),
      price: Number(price),
      category,
      image: imageUrl,
      images: imageUrls,
      description: description ? description.trim() : '',
      isFeatured: isFeatured === 'true' || isFeatured === true,
      inStock: inStock !== 'false' && inStock !== false,
      productType: productType || 'simple',
      sizes: productType === 'variable' ? parseSizes(sizes) : [],
      attributes: parsedAttributes,
    });

    const populated = await product.populate('category', 'name slug');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'SKU already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
  try {
    const { title, sku, price, category, description, isFeatured, inStock, productType, sizes, attributes } = req.body;
    const updateData = {};

    if (title) updateData.title = title.trim();
    if (sku) updateData.sku = sku.trim().toUpperCase();
    if (price !== undefined) updateData.price = Number(price);
    if (category) updateData.category = category;
    if (description !== undefined) updateData.description = description.trim();
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured === 'true' || isFeatured === true;
    if (inStock !== undefined) updateData.inStock = inStock !== 'false' && inStock !== false;
    
    if (productType) {
      updateData.productType = productType;
      if (productType === 'variable') {
        if (sizes !== undefined) {
          updateData.sizes = parseSizes(sizes);
        }
        if (attributes !== undefined) {
          try {
            updateData.attributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;
          } catch (e) {
            if (Array.isArray(attributes)) updateData.attributes = attributes;
          }
        }
      } else {
        updateData.sizes = [];
        updateData.attributes = [];
      }
    } else {
      if (sizes !== undefined) {
        updateData.sizes = parseSizes(sizes);
      }
      if (attributes !== undefined) {
        try {
          updateData.attributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;
        } catch (e) {
          if (Array.isArray(attributes)) updateData.attributes = attributes;
        }
      }
    }

    // Handle image updates
    if (req.body.existingImages !== undefined || (req.files && req.files.length > 0)) {
      let existing = [];
      if (req.body.existingImages) {
        try {
          existing = JSON.parse(req.body.existingImages);
        } catch (e) {
          if (Array.isArray(req.body.existingImages)) {
            existing = req.body.existingImages;
          } else if (typeof req.body.existingImages === 'string') {
            existing = [req.body.existingImages];
          }
        }
      }
      
      const newUrls = req.files ? req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) : [];
      const combined = [...existing, ...newUrls];
      
      if (combined.length > 0) {
        updateData.image = combined[0];
        updateData.images = combined;
      } else {
        return res.status(400).json({ success: false, message: 'Product image is required' });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: `Product "${product.title}" deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/products/stats
// @access  Admin
const getStats = async (req, res) => {
  try {
    const Category = require('../models/Category');
    const [totalProducts, totalCategories, featuredCount, inStockCount, recentProducts] =
      await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Product.countDocuments({ isFeatured: true }),
        Product.countDocuments({ inStock: true }),
        Product.find()
          .populate('category', 'name')
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        featuredCount,
        inStockCount,
        recentProducts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getStats,
};
