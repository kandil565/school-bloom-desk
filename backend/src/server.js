import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import canteenRoutes from './routes/canteenRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import workshopRoutes from './routes/workshopRoutes.js';
import curriculumRoutes from './routes/curriculumRoutes.js';
import transportationRoutes from './routes/transportationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database (non-blocking on Vercel)
connectDB().catch(err => {
  console.error('Initial DB connection warning:', err.message);
  if (process.env.VERCEL) {
    console.log('On Vercel: continuing without initial connection');
  }
});

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for easier deployment, restrict this in a real prod environment
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { seedDatabase } from './utils/seedData.js';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/canteen', canteenRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/transportation', transportationRoutes);

// Database seed endpoint (temporary for setup)
app.get('/api/seed', async (req, res) => {
  try {
    console.log('\n=== SEED ENDPOINT CALLED ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('MONGODB_URI type:', typeof process.env.MONGODB_URI);
    
    if (process.env.MONGODB_URI) {
      console.log('MONGODB_URI length:', process.env.MONGODB_URI.length);
      console.log('URI starts with:', process.env.MONGODB_URI.substring(0, 30));
    }
    
    console.log('Starting seed...');
    const result = await seedDatabase();
    console.log('✅ Seed successful');
    console.log('=== SEED COMPLETE ===\n');
    
    res.status(200).json(result);
  } catch (error) {
    console.error('=== SEED ERROR ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('=== END ERROR ===\n');
    
    res.status(500).json({ 
      success: false, 
      message: error.message,
      error: error.name,
      mongodbUri: process.env.MONGODB_URI ? 'SET' : 'NOT SET'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server only if not in serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
