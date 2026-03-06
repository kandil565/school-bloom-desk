import express from 'express';
import {
  getAttendance,
  markAttendance,
  updateAttendance,
} from '../controllers/attendanceController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAttendance);
router.post('/', authMiddleware, markAttendance);
router.put('/:id', authMiddleware, updateAttendance);

export default router;
