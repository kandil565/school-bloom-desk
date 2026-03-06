import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    subjectName: String,
    academicYear: String,
    semester: String,
    marks: Number,
    totalMarks: Number,
    percentage: Number,
    grade: String,
    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.model('Grade', gradeSchema);
