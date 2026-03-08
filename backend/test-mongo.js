import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('URI length:', process.env.MONGODB_URI?.length);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    
    console.log('✅ Connected to:', conn.connection.host);
    console.log('✅ Database:', conn.connection.name);
    
    // Try to create a simple collection
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    await TestModel.deleteMany({});
    const doc = await TestModel.create({ test: 'Hello' });
    console.log('✅ Created document:', doc._id);
    
    const found = await TestModel.findById(doc._id);
    console.log('✅ Found document:', found.test);
    
    await mongoose.disconnect();
    console.log('✅ Connection test passed!');
    
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

testConnection();
