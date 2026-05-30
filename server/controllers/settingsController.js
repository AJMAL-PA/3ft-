const Settings = require('../models/Settings');

// @desc    Get settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Auto-seed default settings if none exist
    if (!settings) {
      settings = await Settings.create({
        whatsappNumber: '9846417073',
        storeName: '3FT Archives',
      });
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Admin
const updateSettings = async (req, res) => {
  try {
    const { whatsappNumber, storeName } = req.body;

    if (!whatsappNumber || !whatsappNumber.trim()) {
      return res.status(400).json({ success: false, message: 'WhatsApp number is required' });
    }

    // Remove any non-digit characters except leading +
    const cleanedNumber = whatsappNumber.trim().replace(/[^\d+]/g, '');

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        whatsappNumber: cleanedNumber,
        storeName: storeName || '3FT Archives',
      });
    } else {
      settings.whatsappNumber = cleanedNumber;
      if (storeName) settings.storeName = storeName.trim();
      await settings.save();
    }

    res.json({ success: true, data: settings, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings };
