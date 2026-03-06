import Inventory from '../models/Inventory.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllInventory = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const inventory = await Inventory.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, inventory, 'Inventory retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json(new ApiError(404, 'Inventory item not found'));
    }
    return res.status(200).json(new ApiResponse(200, item, 'Inventory item retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    return res.status(201).json(new ApiResponse(201, item, 'Inventory item created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json(new ApiError(404, 'Inventory item not found'));
    }
    return res.status(200).json(new ApiResponse(200, item, 'Inventory item updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json(new ApiError(404, 'Inventory item not found'));
    }
    return res.status(200).json(new ApiResponse(200, {}, 'Inventory item deleted successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
