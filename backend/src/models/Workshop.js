import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    participants: {
      type: String,
      default: '0',
    },
    status: {
      type: String,
      enum: ['Completed', 'Pending', 'In Progress', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Workshop', workshopSchema);
