import Complaint from '../models/Complaint.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllComplaints = async (req, res) => {
  try {
    const { category, status, priority } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const complaints = await Complaint.find(filter)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, complaints, 'Complaints retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('assignedTo', 'name email');
    if (!complaint) {
      return res.status(404).json(new ApiError(404, 'Complaint not found'));
    }
    return res.status(200).json(new ApiResponse(200, complaint, 'Complaint retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    return res.status(201).json(new ApiResponse(201, complaint, 'Complaint created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('assignedTo', 'name email');
    if (!complaint) {
      return res.status(404).json(new ApiError(404, 'Complaint not found'));
    }
    return res.status(200).json(new ApiResponse(200, complaint, 'Complaint updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};
