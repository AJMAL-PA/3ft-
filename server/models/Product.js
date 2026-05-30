const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    productType: {
      type: String,
      enum: ['simple', 'variable'],
      default: 'simple',
    },
    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL'],
    },
    attributes: [
      {
        name: { type: String, required: true },
        values: { type: [String], default: [] }
      }
    ],
  },
  { timestamps: true }
);

// Virtual for formatted price display
productSchema.virtual('formattedPrice').get(function () {
  return `₹${this.price.toLocaleString()}`;
});

module.exports = mongoose.model('Product', productSchema);
