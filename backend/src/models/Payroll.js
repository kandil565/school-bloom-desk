import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    month: {
      type: Date,
      required: true,
    },
    baseSalary: Number,
    allowances: {
      hra: Number,
      da: Number,
      other: Number,
    },
    deductions: {
      pf: Number,
      tax: Number,
      insurance: Number,
      other: Number,
    },
    netSalary: Number,
    status: {
      type: String,
      enum: ['Draft', 'Approved', 'Paid'],
      default: 'Draft',
    },
    paymentDate: Date,
    remarks: String,
  },
  { timestamps: true }
);

payrollSchema.index({ employeeId: 1, month: 1 }, { unique: true });

export default mongoose.model('Payroll', payrollSchema);
