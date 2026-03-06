import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    academicYear: String,
    feeType: {
      type: String,
      enum: ['Tuition', 'Sports', 'Transport', 'Hostel', 'Other'],
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate: Date,
    paidDate: Date,
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Overdue', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Bank Transfer', 'Check', 'Card'],
    },
    receiptNumber: String,
    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.model('Fee', feeSchema);
