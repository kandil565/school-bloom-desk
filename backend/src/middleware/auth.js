import { verifyToken } from '../utils/tokenUtils.js';
import { ApiError } from '../utils/ApiResponse.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError(401, 'No token provided');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw new ApiError(401, 'Invalid or expired token');
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(error.statusCode || 401).json({
      success: false,
      message: error.message || 'Authentication failed',
    });
  }
};

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    try {
      Promise.resolve(fn(req, res, next)).catch((err) => {
        if (typeof next === 'function') {
          next(err);
        } else {
          res.status(500).json({ error: err.message });
        }
      });
    } catch (err) {
      if (typeof next === 'function') {
        next(err);
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };
};
