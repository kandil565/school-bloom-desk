import Employee from '../models/Employee.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllEmployees = async (req, res) => {
  try {
    const { department, position, isActive } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (position) filter.position = position;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const employees = await Employee.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, employees, 'Employees retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json(new ApiError(404, 'Employee not found'));
    }
    return res.status(200).json(new ApiResponse(200, employee, 'Employee retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    return res.status(201).json(new ApiResponse(201, employee, 'Employee created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json(new ApiError(404, 'Employee not found'));
    }
    return res.status(200).json(new ApiResponse(200, employee, 'Employee updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json(new ApiError(404, 'Employee not found'));
    }
    return res.status(200).json(new ApiResponse(200, {}, 'Employee deleted successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
