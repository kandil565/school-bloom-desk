import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    itemCode: {
      type: String,
      required: true,
      unique: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    category: String,
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    reorderLevel: Number,
    unitPrice: Number,
    supplier: String,
    location: String,
    description: String,
    lastRestockDate: Date,
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Inventory', inventorySchema);
