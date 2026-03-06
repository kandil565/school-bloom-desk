import Attendance from '../models/Attendance.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.query;
    const filter = {};

    if (employeeId) filter.employeeId = employeeId;
    if (date) {
      const dateObj = new Date(date);
      filter.date = {
        $gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()),
        $lt: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1),
      };
    }
    if (status) filter.status = status;

    const attendance = await Attendance.find(filter)
      .populate('employeeId', 'firstName lastName employeeId')
      .sort({ date: -1 });
    return res.status(200).json(new ApiResponse(200, attendance, 'Attendance records retrieved'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status, checkInTime, checkOutTime, remarks } = req.body;

    const existingRecord = await Attendance.findOne({ employeeId, date });
    if (existingRecord) {
      return res.status(400).json(new ApiError(400, 'Attendance already marked for this date'));
    }

    const attendance = await Attendance.create({
      employeeId,
      date,
      status,
      checkInTime,
      checkOutTime,
      remarks,
    });

    return res.status(201).json(new ApiResponse(201, attendance, 'Attendance marked successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!attendance) {
      return res.status(404).json(new ApiError(404, 'Attendance record not found'));
    }
    return res.status(200).json(new ApiResponse(200, attendance, 'Attendance updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};
