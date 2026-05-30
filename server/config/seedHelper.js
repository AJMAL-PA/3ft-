const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Settings = require('../models/Settings');

const categoriesData = [
  { name: 'Jackets', imageFile: 'download (8).jpeg' },
  { name: 'T-Shirts', imageFile: 'Netherlands 2004 Nike Total 90 Home Shirt Reissue.jpeg' },
  { name: 'Leather Jackets', imageFile: '@amiri — shop new arrivals at all retail locations + online_.jpeg' },
  { name: 'Jeans', imageFile: 'Jeans.jpeg' },
  { name: 'Accessories', imageFile: 'download (10).jpeg' },
  { name: 'Jerseys', imageFile: 'download (9).jpeg' }
];

const productsData = [
  // Jackets
  { title: 'Lambskin Field Jacket', sku: 'AS1253', price: 11700, category: 'Jackets', imageFile: 'download (5).jpeg' },
  { title: 'Oversized Utility Parka', sku: 'AS1302', price: 24900, category: 'Jackets', imageFile: 'Rasant Adidas Spring 2025 (Adidas).jpeg' },
  { title: 'Nylon Track Jacket', sku: 'AS1304', price: 14500, category: 'Jackets', imageFile: 'download (4).jpeg' },
  { title: 'Quilted Liner Bomber', sku: 'AS1305', price: 18200, category: 'Jackets', imageFile: 'search-friendly😍.jpeg' },
  
  // T-Shirts
  { title: 'Roundneck Long T-Shirt', sku: 'AS1257', price: 5900, category: 'T-Shirts', imageFile: 'Rasant Adidas Spring 2025 (Adidas).jpeg' },
  { title: 'Heavyweight Blank Tee', sku: 'AS1314', price: 4200, category: 'T-Shirts', imageFile: 'download (5).jpeg' },
  { title: 'Vintage Graphic Tee', sku: 'AS1315', price: 6500, category: 'T-Shirts', imageFile: 'ype & Attitude.jpeg' },
  { title: 'Relaxed Fit Pocket Tee', sku: 'AS1316', price: 5200, category: 'T-Shirts', imageFile: 'download (5).jpeg' },

  // Leather Jackets
  { title: 'Two-Button Leather Blazer', sku: 'AS1218', price: 14500, category: 'Leather Jackets', imageFile: 'download (5).jpeg' },
  { title: 'Zip-Up Biker Jacket', sku: 'AS1400', price: 31500, category: 'Leather Jackets', imageFile: 'download (4).jpeg' },
  { title: 'Distressed Moto Jacket', sku: 'AS1402', price: 28900, category: 'Leather Jackets', imageFile: 'download (5).jpeg' },
  { title: 'Classic Rider Jacket', sku: 'AS1403', price: 33000, category: 'Leather Jackets', imageFile: 'Rasant Adidas Spring 2025 (Adidas).jpeg' },

  // Jeans
  { title: 'Distressed Archive Jeans', sku: 'AS1171', price: 21000, category: 'Jeans', imageFile: 'search-friendly😍.jpeg' },
  { title: 'Relaxed Wide-Leg Jeans', sku: 'AS1422', price: 15800, category: 'Jeans', imageFile: 'download (5).jpeg' },
  { title: 'Straight Cut Denim', sku: 'AS1424', price: 12500, category: 'Jeans', imageFile: 'ype & Attitude.jpeg' },
  { title: 'Vintage Selvedge Jeans', sku: 'AS1425', price: 24000, category: 'Jeans', imageFile: 'download (4).jpeg' },

  // Accessories
  { title: 'Signature Luxury Bag', sku: 'AS1099', price: 4500, category: 'Accessories', imageFile: 'ype & Attitude.jpeg' },
  { title: 'Handmade Leather Belt', sku: 'AS1450', price: 7500, category: 'Accessories', imageFile: 'search-friendly😍.jpeg' },
  { title: 'Silver Link Bracelet', sku: 'AS1452', price: 3200, category: 'Accessories', imageFile: 'download (5).jpeg' },
  { title: 'Cotton Twill Cap', sku: 'AS1453', price: 2500, category: 'Accessories', imageFile: 'download (5).jpeg' },

  // Jerseys
  { title: 'Vintage Retro Jersey', sku: 'AS1166', price: 19400, category: 'Jerseys', imageFile: 'download (4).jpeg' },
  { title: 'Archive Athletic Jersey', sku: 'AS1501', price: 13200, category: 'Jerseys', imageFile: 'ype & Attitude.jpeg' },
  { title: 'Striped Team Jersey', sku: 'AS1503', price: 11800, category: 'Jerseys', imageFile: 'Rasant Adidas Spring 2025 (Adidas).jpeg' },
  { title: 'Collegiate V-Neck Jersey', sku: 'AS1504', price: 16400, category: 'Jerseys', imageFile: 'search-friendly😍.jpeg' }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Settings.deleteMany({});
    console.log('🧹 Cleared existing products, categories, and settings.');

    // Create folders
    const assetsDir = path.join(__dirname, '../../client/src/assets');
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Function to copy assets safely
    const copyAssetToUploads = (filename) => {
      const srcPath = path.join(assetsDir, filename);
      const destPath = path.join(uploadsDir, filename);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        return true;
      }
      return false;
    };

    // Pre-seed Settings
    const settings = await Settings.create({
      whatsappNumber: '9846417073',
      storeName: '3FT Archives'
    });
    console.log('⚙️ Settings seeded:', settings);

    // Pre-seed Categories
    const categoriesMap = {};
    for (const cat of categoriesData) {
      // Try to copy the category banner image if it exists
      let imageUrl = '';
      if (copyAssetToUploads(cat.imageFile)) {
        imageUrl = `http://localhost:5000/uploads/${cat.imageFile}`;
      }

      const createdCat = await Category.create({
        name: cat.name,
        image: imageUrl
      });
      categoriesMap[cat.name] = createdCat._id;
    }
    console.log(`📂 Seeded ${Object.keys(categoriesMap).length} categories.`);

    // Pre-seed Products
    let seededProductsCount = 0;
    for (const prod of productsData) {
      const catId = categoriesMap[prod.category];
      if (!catId) continue;

      let imageUrl = '';
      if (copyAssetToUploads(prod.imageFile)) {
        imageUrl = `http://localhost:5000/uploads/${prod.imageFile}`;
      }

      await Product.create({
        title: prod.title,
        sku: prod.sku,
        price: prod.price,
        category: catId,
        image: imageUrl,
        description: `${prod.title} - curated archive premium item.`,
        isFeatured: ['Zip-Up Biker Jacket', 'Heavyweight Blank Tee', 'Distressed Archive Jeans', 'Vintage Retro Jersey'].includes(prod.title),
        inStock: true
      });
      seededProductsCount++;
    }

    console.log(`📦 Seeded ${seededProductsCount} products.`);
    console.log('✨ Database seeded successfully!');
    return true;
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};

module.exports = { seedDatabase };
