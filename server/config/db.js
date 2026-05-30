const mongoose = require('mongoose');
const { seedDatabase } = require('./seedHelper');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`\n⚠️  Local MongoDB Connection to port 27017 refused.`);
      console.log(`🚀 Launching local in-memory MongoDB server fallback...`);
      
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        // Disable internet connection check warnings to keep logs clean
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        console.log(`📦 In-Memory MongoDB running at: ${mongoUri}`);
        await mongoose.connect(mongoUri);
        console.log(`✅ Connected to In-Memory MongoDB.`);
        
        // Auto-seed database
        console.log(`🌱 Seeding in-memory database with default products and categories...`);
        await seedDatabase();
        console.log(`✨ In-memory database seeded and ready!\n`);
      } catch (memError) {
        console.error(`❌ Failed to start in-memory MongoDB fallback:`, memError.message);
        process.exit(1);
      }
    } else {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
