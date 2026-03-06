import express from 'express';
import {
  getAllInventory,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '../controllers/inventoryController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAllInventory);
router.get('/:id', authMiddleware, getInventoryById);
router.post('/', authMiddleware, createInventoryItem);
router.put('/:id', authMiddleware, updateInventoryItem);
router.delete('/:id', authMiddleware, deleteInventoryItem);

export default router;
