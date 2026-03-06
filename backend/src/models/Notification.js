import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: String,
    message: String,
    type: {
      type: String,
      enum: ['Info', 'Warning', 'Success', 'Error'],
      default: 'Info',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedModule: String,
    relatedId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
