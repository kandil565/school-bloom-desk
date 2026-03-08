import mongoose from 'mongoose';

const canteenSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Main Course', 'Appetizer', 'Beverage', 'Dessert', 'Snack', 'Other'],
    },
    price: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['In Stock', 'Out of Stock'],
      default: 'In Stock',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Canteen', canteenSchema);
