const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      default: '9846417073',
      trim: true,
    },
    storeName: {
      type: String,
      default: '3FT Archives',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
