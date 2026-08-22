const mongoose = require('mongoose');

console.log('📡 Attempting to connect to MongoDB...');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/hrms');
    console.log('✅ MongoDB Connected successfully!');
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('⚠️  Make sure MongoDB is running!');
    console.log('   Run: mongod');
    process.exit(1);
  }
};

module.exports = connectDB;
