import mongoose from 'mongoose';
import { hashPassword } from '../utils/authUtils.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'staff', 'parent', 'student'],
      default: 'staff',
    },
    department: {
      type: String,
      enum: ['HR', 'Finance', 'Operations', 'IT', 'Academic', 'Admin'],
    },
    phone: {
      type: String,
      match: [/^[0-9]{10,14}$/, 'Please provide a valid phone number'],
    },
    avatar: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

export default mongoose.model('User', userSchema);
