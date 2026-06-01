const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Check if Cloudinary is fully configured in environment
const isConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('⚠️ Cloudinary is not configured. Falling back to local file storage.');
}

/**
 * Uploads a local file to Cloudinary and deletes it locally afterwards.
 * If Cloudinary is not configured, it returns a local server URL.
 * @param {string} filePath - Absolute path to the local file
 * @param {string} folder - Cloudinary folder name (e.g., 'categories' or 'products')
 * @param {object} [req] - Express request object (optional, for local URL protocol and host)
 * @returns {Promise<string>} Secure URL of the uploaded image
 */
const uploadToCloudinary = async (filePath, folder = '3ft-archive', req) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist at: ${filePath}`);
  }

  // Fallback to local storage if Cloudinary is not configured
  if (!isConfigured) {
    const filename = path.basename(filePath);
    if (req) {
      return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    }
    const port = process.env.PORT || 5000;
    return `http://localhost:${port}/uploads/${filename}`;
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });
    // Remove local file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return result.secure_url;
  } catch (error) {
    // Clean up local file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

/**
 * Deletes an image from Cloudinary using its secure URL.
 * If URL is not a Cloudinary URL, it does nothing.
 * @param {string} imageUrl - Cloudinary secure URL
 * @returns {Promise<any|null>} Cloudinary destruction response or null
 */
const deleteFromCloudinary = async (imageUrl) => {
  if (!isConfigured || !imageUrl || !imageUrl.includes('cloudinary.com')) {
    return null;
  }

  try {
    // Extract public ID from Cloudinary URL
    // URL pattern: https://res.cloudinary.com/cloud_name/image/upload/v1234567/folder/public_id.jpg
    const parts = imageUrl.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Everything after the version (vXXXXXX) segment is the path
    // e.g. folder/public_id.jpg
    let pathParts = parts.slice(uploadIndex + 2); // skips 'upload' and version segment
    const fileWithExtension = pathParts.join('/');
    const publicId = fileWithExtension.substring(0, fileWithExtension.lastIndexOf('.'));
    
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Failed to delete image from Cloudinary:', error);
    return null;
  }
};

module.exports = {
  isConfigured,
  uploadToCloudinary,
  deleteFromCloudinary,
  cloudinary,
};
