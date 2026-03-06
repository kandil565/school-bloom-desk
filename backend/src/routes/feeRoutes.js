import express from 'express';
import {
  getAllFees,
  getFeeById,
  createFee,
  updateFee,
} from '../controllers/feeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAllFees);
router.get('/:id', authMiddleware, getFeeById);
router.post('/', authMiddleware, createFee);
router.put('/:id', authMiddleware, updateFee);

export default router;
