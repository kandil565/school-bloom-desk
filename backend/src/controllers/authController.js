import User from '../models/User.js';
import { comparePassword } from '../utils/authUtils.js';
import { generateToken } from '../utils/tokenUtils.js';
import { ApiResponse, ApiError } from '../utils/ApiResponse.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(new ApiError(400, 'Email and password are required'));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json(new ApiError(401, 'Invalid email or password'));
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(new ApiError(401, 'Invalid email or password'));
    }

    if (!user.isActive) {
      return res.status(403).json(new ApiError(403, 'User account is deactivated'));
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    const response = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        avatar: user.avatar,
      },
      token,
    };

    return res.status(200).json(new ApiResponse(200, response, 'Login successful'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(new ApiError(400, 'Name, email and password are required'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(new ApiError(400, 'Email already exists'));
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'staff',
      department,
    });

    const token = generateToken(user._id);
    const response = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
      token,
    };

    return res.status(201).json(new ApiResponse(201, response, 'User registered successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json(new ApiError(404, 'User not found'));
    }

    return res.status(200).json(new ApiResponse(200, user, 'User retrieved successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    return res.status(200).json(new ApiResponse(200, user, 'Profile updated successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
