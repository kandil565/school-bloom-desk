import Student from '../models/Student.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getAllStudents = async (req, res) => {
  try {
    const { grade, section, isActive } = req.query;
    const filter = {};

    if (grade) filter.grade = grade;
    if (section) filter.section = section;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const students = await Student.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, students, 'Students retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json(new ApiError(404, 'Student not found'));
    }
    return res.status(200).json(new ApiResponse(200, student, 'Student retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json(new ApiResponse(201, student, 'Student created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json(new ApiError(404, 'Student not found'));
    }
    return res.status(200).json(new ApiResponse(200, student, 'Student updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json(new ApiError(404, 'Student not found'));
    }
    return res.status(200).json(new ApiResponse(200, {}, 'Student deleted successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
