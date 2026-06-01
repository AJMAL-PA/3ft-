const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Category = require('../models/Category');
const Product = require('../models/Product');
const { isConfigured, uploadToCloudinary } = require('../utils/cloudinary');

const uploadsDir = path.join(__dirname, '../uploads');

// Utility to parse local filename from image URL
const getLocalFilename = (url) => {
  if (!url || typeof url !== 'string') return null;
  if (url.includes('/uploads/')) {
    const parts = url.split('/uploads/');
    const filePart = parts[parts.length - 1];
    return decodeURIComponent(filePart.split('?')[0]);
  }
  return null;
};

const migrate = async () => {
  if (!isConfigured) {
    console.error('❌ Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your server/.env file before running migration.');
    process.exit(1);
  }

  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/3ft-archive';
    console.log(`Connecting to database: ${dbUri}...`);
    await mongoose.connect(dbUri);
    console.log('✅ Connected to MongoDB.');

    // 1. Migrate Categories
    console.log('\n--- Migrating Categories ---');
    const categories = await Category.find({});
    let categorySuccessCount = 0;

    for (const category of categories) {
      const filename = getLocalFilename(category.image);
      if (filename) {
        const localPath = path.join(uploadsDir, filename);
        if (fs.existsSync(localPath)) {
          console.log(`Uploading category "${category.name}" image (${filename}) to Cloudinary...`);
          try {
            // Note: We don't want to delete the file during general migration so the developer keeps a copy on disk
            // We temporarily copy it to a temp path for the helper, or override the helper's deletion.
            // Since uploadToCloudinary deletes the file, let's create a temp copy to upload.
            const tempFileName = `temp_migrate_${Date.now()}_${filename}`;
            const tempFilePath = path.join(uploadsDir, tempFileName);
            fs.copyFileSync(localPath, tempFilePath);

            const cloudinaryUrl = await uploadToCloudinary(tempFilePath, '3ft-archive/categories');
            category.image = cloudinaryUrl;
            await category.save();
            categorySuccessCount++;
            console.log(`✅ Category "${category.name}" image migrated to: ${cloudinaryUrl}`);
          } catch (err) {
            console.error(`❌ Failed to upload image for category "${category.name}":`, err.message);
          }
        } else {
          console.warn(`⚠️ Local file not found for category "${category.name}": ${localPath}`);
        }
      } else {
        console.log(`ℹ️ Category "${category.name}" already has external image URL or no image.`);
      }
    }
    console.log(`Migration summary: ${categorySuccessCount}/${categories.length} categories migrated.`);

    // 2. Migrate Products
    console.log('\n--- Migrating Products ---');
    const products = await Product.find({});
    let productSuccessCount = 0;

    for (const product of products) {
      let isUpdated = false;

      // Migrate primary image
      const primaryFilename = getLocalFilename(product.image);
      if (primaryFilename) {
        const localPath = path.join(uploadsDir, primaryFilename);
        if (fs.existsSync(localPath)) {
          console.log(`Uploading product "${product.title}" primary image (${primaryFilename}) to Cloudinary...`);
          try {
            const tempFileName = `temp_migrate_${Date.now()}_${primaryFilename}`;
            const tempFilePath = path.join(uploadsDir, tempFileName);
            fs.copyFileSync(localPath, tempFilePath);

            const cloudinaryUrl = await uploadToCloudinary(tempFilePath, '3ft-archive/products');
            product.image = cloudinaryUrl;
            isUpdated = true;
          } catch (err) {
            console.error(`❌ Failed to upload primary image for product "${product.title}":`, err.message);
          }
        } else {
          console.warn(`⚠️ Local file not found for product "${product.title}" primary image: ${localPath}`);
        }
      }

      // Migrate images array
      if (product.images && product.images.length > 0) {
        const updatedImages = [];
        for (let i = 0; i < product.images.length; i++) {
          const imgUrl = product.images[i];
          const filename = getLocalFilename(imgUrl);
          if (filename) {
            const localPath = path.join(uploadsDir, filename);
            if (fs.existsSync(localPath)) {
              console.log(`Uploading product "${product.title}" image ${i+1}/${product.images.length} (${filename}) to Cloudinary...`);
              try {
                const tempFileName = `temp_migrate_${Date.now()}_${filename}`;
                const tempFilePath = path.join(uploadsDir, tempFileName);
                fs.copyFileSync(localPath, tempFilePath);

                const cloudinaryUrl = await uploadToCloudinary(tempFilePath, '3ft-archive/products');
                updatedImages.push(cloudinaryUrl);
                isUpdated = true;
              } catch (err) {
                console.error(`❌ Failed to upload image ${i+1} for product "${product.title}":`, err.message);
                updatedImages.push(imgUrl); // Keep old URL if upload fails
              }
            } else {
              console.warn(`⚠️ Local file not found for product "${product.title}" image ${i+1}: ${localPath}`);
              updatedImages.push(imgUrl);
            }
          } else {
            updatedImages.push(imgUrl);
          }
        }
        if (isUpdated) {
          product.images = updatedImages;
        }
      }

      if (isUpdated) {
        await product.save();
        productSuccessCount++;
        console.log(`✅ Product "${product.title}" images migrated.`);
      } else {
        console.log(`ℹ️ Product "${product.title}" already has external images or no images.`);
      }
    }
    console.log(`Migration summary: ${productSuccessCount}/${products.length} products migrated.`);

    console.log('\n✨ Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrate();
