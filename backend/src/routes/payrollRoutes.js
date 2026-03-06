import express from 'express';
import {
  getAllPayroll,
  getPayrollById,
  createPayroll,
  updatePayroll,
} from '../controllers/payrollController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAllPayroll);
router.get('/:id', authMiddleware, getPayrollById);
router.post('/', authMiddleware, createPayroll);
router.put('/:id', authMiddleware, updatePayroll);

export default router;
