import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    assetCode: {
      type: String,
      required: true,
      unique: true,
    },
    assetName: String,
    assetType: String,
    category: String,
    purchaseDate: Date,
    purchasePrice: Number,
    currentValue: Number,
    location: String,
    custodian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Damaged', 'Under Repair'],
      default: 'Active',
    },
    serialNumber: String,
    warranty: String,
    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.model('Asset', assetSchema);
