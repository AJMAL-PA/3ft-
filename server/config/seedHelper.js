const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Settings = require('../models/Settings');

const fallbackProductImage = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80';
const fallbackCategoryImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80';

const categoriesData = [
  { name: 'Jackets', imageFile: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' },
  { name: 'T-Shirts', imageFile: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' },
  { name: 'Leather Jackets', imageFile: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80' },
  { name: 'Jeans', imageFile: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Accessories', imageFile: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Jerseys', imageFile: 'https://images.unsplash.com/photo-1579952362973-27b180007877?auto=format&fit=crop&w=800&q=80' }
];

const productsData = [
  // Jackets
  {
    title: 'Vintage Denim Trucker Jacket',
    sku: 'JK-DEN-001',
    price: 4999,
    category: 'Jackets',
    imageFile: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    description: 'Classic 90s vintage denim jacket. Heavyweight cotton, faded wash, featuring buttoned chest pockets and adjustable waist tabs. A timeless layer for any wardrobe.'
  },
  {
    title: 'Utility Field Parka',
    sku: 'JK-PAR-002',
    price: 8999,
    category: 'Jackets',
    imageFile: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80',
    description: 'Rugged military-inspired field parka. Water-resistant outer shell with adjustable hood, multiple utility pockets, and warm quilted interior. Perfect for transitional weather.'
  },
  {
    title: 'Retro Windbreaker Jacket',
    sku: 'JK-WIN-003',
    price: 3499,
    category: 'Jackets',
    imageFile: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    description: 'Nostalgic 80s colorblock windbreaker. Lightweight, breathable nylon with elastic cuffs, full-zip closure, and embroidered chest branding. Wind and water resistant.'
  },
  {
    title: 'Minimalist Wool Bomber',
    sku: 'JK-BOM-004',
    price: 7499,
    category: 'Jackets',
    imageFile: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80',
    description: 'Premium wool blend bomber jacket. Sleek silhouette with ribbed collar and cuffs, dual side welt pockets, and a smooth satin inner lining. Elegant comfort.'
  },
  
  // T-Shirts
  {
    title: 'Heavyweight Oversized Tee',
    sku: 'TS-OV-001',
    price: 1999,
    category: 'T-Shirts',
    imageFile: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from 300GSM double-yarn cotton. Features a relaxed boxy fit, dropped shoulders, and a thick ribbed collar that won\'t lose its shape. Pre-shrunk and ultra-soft.'
  },
  {
    title: 'Vintage Graphic Rock Tee',
    sku: 'TS-GR-002',
    price: 2499,
    category: 'T-Shirts',
    imageFile: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    description: 'Faded black graphic tee with a distressed retro print. Single-stitch hems and a cracked print finish give it an authentic, worn-in vintage look and feel.'
  },
  {
    title: 'Organic Slub Cotton Tee',
    sku: 'TS-SL-003',
    price: 1499,
    category: 'T-Shirts',
    imageFile: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight slub texture tee made from 100% GOTS certified organic cotton. Features a subtle heather pattern, single chest pocket, and comfortable regular fit.'
  },
  {
    title: 'Classic Bretons Striped Tee',
    sku: 'TS-STR-004',
    price: 1799,
    category: 'T-Shirts',
    imageFile: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80',
    description: 'Nautical striped t-shirt inspired by French naval uniforms. Made from premium combed cotton with clean horizontal knit stripes and a comfortable crew neck.'
  },

  // Leather Jackets
  {
    title: 'Classic Lambskin Biker Jacket',
    sku: 'LJ-BIK-001',
    price: 18999,
    category: 'Leather Jackets',
    imageFile: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    description: 'Premium full-grain lambskin leather biker jacket. Asymmetrical zipper closure, zippered cuffs, and classic metal snap-down lapels. Develops a beautiful patina over time.'
  },
  {
    title: 'Distressed Café Racer Jacket',
    sku: 'LJ-RAC-002',
    price: 16499,
    category: 'Leather Jackets',
    imageFile: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80',
    description: 'Retro style café racer leather jacket. Crafted from supple buffed leather with pre-distressed detailing along the seams, a snap-tab collar, and zippered chest pockets.'
  },
  {
    title: 'Suede Aviator Bomber',
    sku: 'LJ-AVI-003',
    price: 19999,
    category: 'Leather Jackets',
    imageFile: 'https://images.unsplash.com/photo-1618333756872-4e6497291149?auto=format&fit=crop&w=800&q=80',
    description: 'Luxurious goat suede aviator jacket. Features a detachable genuine shearling collar, ribbed knit trim, and premium flannel lining. Exceptional warmth and texture.'
  },
  {
    title: 'Tailored Leather Blazer',
    sku: 'LJ-BLZ-004',
    price: 14999,
    category: 'Leather Jackets',
    imageFile: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80',
    description: 'Sophisticated two-button leather blazer. Soft, glove-tanned leather tailored for a sharp, modern silhouette. Features notched lapels and dual rear vents.'
  },

  // Jeans
  {
    title: 'Vintage Selvedge Denim',
    sku: 'JN-SEL-001',
    price: 7999,
    category: 'Jeans',
    imageFile: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    description: '14oz raw Japanese selvedge denim. Straight cut with a mid-rise, signature red-line selvedge ID, and custom branded copper hardware. Built to break in and customize.'
  },
  {
    title: 'Distressed Slim Fit Jeans',
    sku: 'JN-SLM-002',
    price: 4499,
    category: 'Jeans',
    imageFile: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    description: 'Stretch denim slim fit jeans featuring hand-sanded fades, subtle knee distressing, and light whiskering. Blends vintage style with modern comfort.'
  },
  {
    title: 'Relaxed Wide-Leg Denim',
    sku: 'JN-WID-003',
    price: 5499,
    category: 'Jeans',
    imageFile: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80',
    description: '90s-inspired wide-leg jeans in a classic light stonewash finish. Features a loose fit through the thigh and leg opening, metal rivets, and five-pocket styling.'
  },
  {
    title: 'Classic Straight Black Jeans',
    sku: 'JN-BLK-004',
    price: 3999,
    category: 'Jeans',
    imageFile: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    description: 'Stay-black straight cut jeans. Treated to resist fading, made from comfortable ringspun cotton with a hint of stretch. Your everyday versatile bottom.'
  },

  // Accessories
  {
    title: 'Handmade Leather Messenger Bag',
    sku: 'AC-BAG-001',
    price: 9999,
    category: 'Accessories',
    imageFile: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    description: 'Vegetable-tanned full grain leather messenger bag. Fits up to a 15-inch laptop, features brass hardware, adjustable shoulder strap, and multiple internal organizers.'
  },
  {
    title: 'Classic Aviator Sunglasses',
    sku: 'AC-SUN-002',
    price: 3999,
    category: 'Accessories',
    imageFile: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless gold-frame aviator sunglasses. Features polaroid polarized lenses with 100% UV protection, comfortable silicone nose pads, and acetate temple tips.'
  },
  {
    title: 'Full Grain Leather Belt',
    sku: 'AC-BLT-003',
    price: 2499,
    category: 'Accessories',
    imageFile: 'https://images.unsplash.com/photo-1624222247344-550fb8ec5519?auto=format&fit=crop&w=800&q=80',
    description: 'Solid one-piece full grain harness leather belt. Completed with a heavy-duty brushed nickel buckle and hand-burnished edges. Built to last a lifetime.'
  },
  {
    title: 'Sterling Silver Chain Link Bracelet',
    sku: 'AC-BRC-004',
    price: 4999,
    category: 'Accessories',
    imageFile: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    description: 'Solid 925 sterling silver curb chain link bracelet. Handcrafted with a vintage oxidized finish and secure custom lobster clasp closure. Subtle statement piece.'
  },

  // Jerseys
  {
    title: 'Retro Football Club Jersey',
    sku: 'JY-FB-001',
    price: 3499,
    category: 'Jerseys',
    imageFile: 'https://images.unsplash.com/photo-1579952362973-27b180007877?auto=format&fit=crop&w=800&q=80',
    description: 'Vintage-inspired classic football jersey. Lightweight jacquard knit mesh with retro v-neck polo collar, contrast ribbed sleeve cuffs, and flock-printed sponsor detail.'
  },
  {
    title: 'Classic Baseball Jersey',
    sku: 'JY-BB-002',
    price: 3999,
    category: 'Jerseys',
    imageFile: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&w=800&q=80',
    description: 'Button-front classic pinstripe baseball jersey. Made from breathable moisture-wicking fabric with embroidered arched chest script and a rounded shirt-tail hem.'
  },
  {
    title: 'Vintage Hockey Jersey',
    sku: 'JY-HK-003',
    price: 4999,
    category: 'Jerseys',
    imageFile: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight mesh oversized vintage hockey jersey. Features lace-up front collar, embroidered varsity team patches on the shoulders, and double-knit elbows.'
  },
  {
    title: 'Archive Basketball Jersey',
    sku: 'JY-BK-004',
    price: 2999,
    category: 'Jerseys',
    imageFile: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    description: '90s style basketball mesh jersey. Rib-knit striped crewneck and armholes, screen-printed vintage numbers, and an authentic side split hem. Loose sporty fit.'
  }
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

    // Function to copy assets safely (remains for local assets fallback)
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
      let imageUrl = '';
      if (cat.imageFile) {
        if (cat.imageFile.startsWith('http://') || cat.imageFile.startsWith('https://')) {
          imageUrl = cat.imageFile;
        } else if (copyAssetToUploads(cat.imageFile)) {
          imageUrl = `http://localhost:5000/uploads/${cat.imageFile}`;
        }
      }
      if (!imageUrl) imageUrl = fallbackCategoryImage;

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
      if (prod.imageFile) {
        if (prod.imageFile.startsWith('http://') || prod.imageFile.startsWith('https://')) {
          imageUrl = prod.imageFile;
        } else if (copyAssetToUploads(prod.imageFile)) {
          imageUrl = `http://localhost:5000/uploads/${prod.imageFile}`;
        }
      }
      if (!imageUrl) imageUrl = fallbackProductImage;

      await Product.create({
        title: prod.title,
        sku: prod.sku,
        price: prod.price,
        category: catId,
        image: imageUrl,
        description: prod.description || `${prod.title} - curated archive premium item.`,
        isFeatured: ['Classic Lambskin Biker Jacket', 'Heavyweight Oversized Tee', 'Vintage Selvedge Denim', 'Retro Football Club Jersey'].includes(prod.title),
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
