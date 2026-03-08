import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { seedDatabase } from './utils/seedData.js';

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

// Database seed endpoint - MUST be before routes to avoid middleware issues
const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
  try {
    const result = await seedDatabase();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.use('/api/seed', seedRouter);

// Health check endpoint
const healthRouter = express.Router();
healthRouter.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use('/api/health', healthRouter);

// 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use((err, req, res) => {
  console.error('Error caught:', err.message);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server only if not in serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
