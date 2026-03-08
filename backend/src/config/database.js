import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️ MONGODB_URI not set, skipping connection');
      return { connection: { host: 'mock', name: 'mock' } };
    }

    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return mongoose.connection;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.error('Running in production/Vercel, retrying...');
      // Retry once on Vercel
      try {
        const retryConn = await mongoose.connect(process.env.MONGODB_URI, {
          serverSelectionTimeoutMS: 20000,
          connectTimeoutMS: 20000,
          socketTimeoutMS: 60000,
        });
        console.log('✅ Retry successful');
        return retryConn;
      } catch (retryError) {
        console.error('Retry failed:', retryError.message);
        return null;
      }
    }
    process.exit(1);
  }
};

export default connectDB;
