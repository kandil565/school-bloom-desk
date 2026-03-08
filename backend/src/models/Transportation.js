import mongoose from 'mongoose';

const transportationSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      trim: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Operational', 'Maintenance', 'Out of Service'],
      default: 'Operational',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Transportation', transportationSchema);
