import Payroll from '../models/Payroll.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllPayroll = async (req, res) => {
  try {
    const { employeeId, status, month } = req.query;
    const filter = {};

    if (employeeId) filter.employeeId = employeeId;
    if (status) filter.status = status;
    if (month) {
      const monthDate = new Date(month);
      filter.month = {
        $gte: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
        $lt: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1),
      };
    }

    const payroll = await Payroll.find(filter)
      .populate('employeeId', 'firstName lastName employeeId')
      .sort({ month: -1 });
    return res.status(200).json(new ApiResponse(200, payroll, 'Payroll records retrieved'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate(
      'employeeId',
      'firstName lastName employeeId'
    );
    if (!payroll) {
      return res.status(404).json(new ApiError(404, 'Payroll record not found'));
    }
    return res.status(200).json(new ApiResponse(200, payroll, 'Payroll retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.create(req.body);
    await payroll.populate('employeeId', 'firstName lastName employeeId');
    return res.status(201).json(new ApiResponse(201, payroll, 'Payroll created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updatePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('employeeId', 'firstName lastName employeeId');
    if (!payroll) {
      return res.status(404).json(new ApiError(404, 'Payroll record not found'));
    }
    return res.status(200).json(new ApiResponse(200, payroll, 'Payroll updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};
