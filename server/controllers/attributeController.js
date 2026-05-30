const Attribute = require('../models/Attribute');

// Get all attributes
const getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().sort({ name: 1 });
    res.json({ success: true, count: attributes.length, data: attributes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single attribute
const getAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }
    res.json({ success: true, data: attribute });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create attribute
const createAttribute = async (req, res) => {
  try {
    const { name, values } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Attribute name is required' });
    }

    if (!values) {
      return res.status(400).json({ success: false, message: 'Attribute values are required' });
    }

    // Check for duplicate
    const existing = await Attribute.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Attribute with this name already exists' });
    }

    let valArray = [];
    if (Array.isArray(values)) {
      valArray = values;
    } else if (typeof values === 'string') {
      valArray = values.split(',').map((v) => v.trim()).filter(Boolean);
    }

    const attribute = await Attribute.create({
      name: name.trim(),
      values: valArray,
    });
    res.status(201).json({ success: true, data: attribute });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update attribute
const updateAttribute = async (req, res) => {
  try {
    const { name, values } = req.body;
    const updateData = {};

    if (name && name.trim()) {
      updateData.name = name.trim();
      
      const existing = await Attribute.findOne({
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
        _id: { $ne: req.params.id }
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Attribute with this name already exists' });
      }
    }

    if (values !== undefined) {
      if (Array.isArray(values)) {
        updateData.values = values;
      } else if (typeof values === 'string') {
        updateData.values = values.split(',').map((v) => v.trim()).filter(Boolean);
      }
    }

    const attribute = await Attribute.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!attribute) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }

    res.json({ success: true, data: attribute });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete attribute
const deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findByIdAndDelete(req.params.id);

    if (!attribute) {
      return res.status(404).json({ success: false, message: 'Attribute not found' });
    }

    res.json({ success: true, message: `Attribute "${attribute.name}" deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAttributes,
  getAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
};
