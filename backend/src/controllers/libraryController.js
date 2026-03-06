import Library from '../models/Library.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllBooks = async (req, res) => {
  try {
    const { category, author } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (author) filter.author = new RegExp(author, 'i');

    const books = await Library.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, books, 'Books retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) {
      return res.status(404).json(new ApiError(404, 'Book not found'));
    }
    return res.status(200).json(new ApiResponse(200, book, 'Book retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createBook = async (req, res) => {
  try {
    const book = await Library.create(req.body);
    return res.status(201).json(new ApiResponse(201, book, 'Book created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Library.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json(new ApiError(404, 'Book not found'));
    }
    return res.status(200).json(new ApiResponse(200, book, 'Book updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Library.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json(new ApiError(404, 'Book not found'));
    }
    return res.status(200).json(new ApiResponse(200, {}, 'Book deleted successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
