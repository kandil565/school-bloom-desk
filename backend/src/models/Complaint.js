import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
    },
    complainantName: String,
    complainantEmail: String,
    complainantPhone: String,
    category: {
      type: String,
      enum: ['Academic', 'Facility', 'Staff', 'Transport', 'Food', 'Other'],
    },
    subject: String,
    description: String,
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Open', 'Under Review', 'Resolved', 'Closed'],
      default: 'Open',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedDate: Date,
    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.model('Complaint', complaintSchema);
