import express from 'express';
import {
  getCanteenItems,
  createCanteenItem,
  updateCanteenItem,
  deleteCanteenItem,
} from '../controllers/canteenController.js';

const router = express.Router();

router.route('/').get(getCanteenItems).post(createCanteenItem);
router.route('/:id').put(updateCanteenItem).delete(deleteCanteenItem);

export default router;
