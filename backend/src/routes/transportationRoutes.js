import express from 'express';
import {
  getTransportations,
  createTransportation,
  updateTransportation,
  deleteTransportation,
} from '../controllers/transportationController.js';

const router = express.Router();

router.route('/').get(getTransportations).post(createTransportation);
router.route('/:id').put(updateTransportation).delete(deleteTransportation);

export default router;
