import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
      unique: true,
    },
    title: String,
    author: String,
    isbn: String,
    category: String,
    quantity: Number,
    availableQuantity: Number,
    publisher: String,
    publicationYear: Number,
    location: String,
    price: Number,
    accessionNumber: String,
  },
  { timestamps: true }
);

export default mongoose.model('Library', librarySchema);
