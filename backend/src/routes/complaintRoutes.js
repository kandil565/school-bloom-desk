import express from 'express';
import {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
} from '../controllers/complaintController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAllComplaints);
router.get('/:id', authMiddleware, getComplaintById);
router.post('/', authMiddleware, createComplaint);
router.put('/:id', authMiddleware, updateComplaint);

export default router;
