const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Attribute name is required'],
      unique: true,
      trim: true,
    },
    values: {
      type: [String],
      required: [true, 'Attribute values are required'],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attribute', attributeSchema);
