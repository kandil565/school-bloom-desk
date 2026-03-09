import mongoose from 'mongoose';
import User from './src/models/User.js';
import connectDB from './src/config/database.js';
import { comparePassword } from './src/utils/authUtils.js';
import dotenv from 'dotenv';
dotenv.config();

const checkUsers = async () => {
  await connectDB();
  const emails = ['admin@school.com', 'teacher1@school.com', 'staff@school.com'];
  const passwords = ['admin123', 'teacher123', 'staff123'];

  for (let i = 0; i < emails.length; i++) {
    const user = await User.findOne({ email: emails[i] }).select('+password');
    if (!user) {
      console.log(`User ${emails[i]} not found`);
      continue;
    }
    const isValid = await comparePassword(passwords[i], user.password);
    console.log(`User: ${emails[i]}, Password Valid: ${isValid}`);
  }
  process.exit();
}
checkUsers();
