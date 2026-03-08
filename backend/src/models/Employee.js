import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    position: String,
    department: String,
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract'],
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    salary: Number,
    bankAccountNumber: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
