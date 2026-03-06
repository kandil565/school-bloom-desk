import Grade from '../models/Grade.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const getGrades = async (req, res) => {
  try {
    const { studentId, subject, academicYear } = req.query;
    const filter = {};

    if (studentId) filter.studentId = studentId;
    if (subject) filter.subjectName = subject;
    if (academicYear) filter.academicYear = academicYear;

    const grades = await Grade.find(filter)
      .populate('studentId', 'firstName lastName rollNumber')
      .sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, grades, 'Grades retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const createGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    await grade.populate('studentId', 'firstName lastName rollNumber');
    return res.status(201).json(new ApiResponse(201, grade, 'Grade created successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('studentId', 'firstName lastName rollNumber');
    if (!grade) {
      return res.status(404).json(new ApiError(404, 'Grade not found'));
    }
    return res.status(200).json(new ApiResponse(200, grade, 'Grade updated successfully'));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
};
