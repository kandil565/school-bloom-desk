import Fee from '../models/Fee.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllFees = async (req, res) => {
  try {
    const { studentId, status, academicYear } = req.query;
    const filter = {};

    if (studentId) filter.studentId = studentId;
    if (status) filter.status = status;
    if (academicYear) filter.academicYear = academicYear;

    const fees = await Fee.find(filter)
      .populate('studentId', 'firstName lastName rollNumber')
      .sort({ dueDate: -1 });
    return res.status(200).json(new ApiResponse(200, fees, 'Fees retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getFeeById = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id).populate('studentId', 'firstName lastName rollNumber');
    if (!fee) {
      return res.status(404).json(new ApiError(404, 'Fee record not found'));
    }
    return res.status(200).json(new ApiResponse(200, fee, 'Fee retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    await fee.populate('studentId', 'firstName lastName rollNumber');
    return res.status(201).json(new ApiResponse(201, fee, 'Fee created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('studentId', 'firstName lastName rollNumber');
    if (!fee) {
      return res.status(404).json(new ApiError(404, 'Fee record not found'));
    }
    return res.status(200).json(new ApiResponse(200, fee, 'Fee updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};
