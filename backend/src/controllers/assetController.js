import Asset from '../models/Asset.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllAssets = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const assets = await Asset.find(filter)
      .populate('custodian', 'firstName lastName employeeId')
      .sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, assets, 'Assets retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id).populate(
      'custodian',
      'firstName lastName employeeId'
    );
    if (!asset) {
      return res.status(404).json(new ApiError(404, 'Asset not found'));
    }
    return res.status(200).json(new ApiResponse(200, asset, 'Asset retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    await asset.populate('custodian', 'firstName lastName employeeId');
    return res.status(201).json(new ApiResponse(201, asset, 'Asset created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('custodian', 'firstName lastName employeeId');
    if (!asset) {
      return res.status(404).json(new ApiError(404, 'Asset not found'));
    }
    return res.status(200).json(new ApiResponse(200, asset, 'Asset updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) {
      return res.status(404).json(new ApiError(404, 'Asset not found'));
    }
    return res.status(200).json(new ApiResponse(200, {}, 'Asset deleted successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
