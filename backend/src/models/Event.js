import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventType: String,
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    location: String,
    organizer: String,
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    budget: Number,
    status: {
      type: String,
      enum: ['Planned', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Planned',
    },
    attachment: String,
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
