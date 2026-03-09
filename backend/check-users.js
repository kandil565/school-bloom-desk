import mongoose from 'mongoose';
import User from './src/models/User.js';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';
dotenv.config();

const checkUsers = async () => {
  await connectDB();
  const users = await User.find({});
  console.log("Users in DB:");
  users.forEach(u => console.log(u.email, u.role, u.password));
  process.exit();
}
checkUsers();
