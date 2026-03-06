import express from 'express';
import {
  getGrades,
  createGrade,
  updateGrade,
} from '../controllers/gradeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getGrades);
router.post('/', authMiddleware, createGrade);
router.put('/:id', authMiddleware, updateGrade);

export default router;
