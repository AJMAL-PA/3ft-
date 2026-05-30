const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { seedDatabase } = require('../config/seedHelper');

const seed = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/3ft-archive';
    console.log(`Connecting to database: ${dbUri}...`);
    await mongoose.connect(dbUri);
    console.log('✅ Connected to MongoDB.');

    await seedDatabase();
    
    console.log('✨ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
