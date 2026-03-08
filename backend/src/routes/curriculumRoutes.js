import express from 'express';
import {
  getCurriculums,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
} from '../controllers/curriculumController.js';

const router = express.Router();

router.route('/').get(getCurriculums).post(createCurriculum);
router.route('/:id').put(updateCurriculum).delete(deleteCurriculum);

export default router;
