import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  getOrders,
  createOrderController,
  updateOrderStatusController,
  deleteOrderController
} from '../controllers/orderController';

export const orderRouter = Router();

orderRouter.get('/', protect(['admin', 'staff']), getOrders);
orderRouter.post('/', protect(['staff']), createOrderController);
orderRouter.put('/:id', protect(['admin']), updateOrderStatusController);
orderRouter.delete('/:id', protect(['admin']), deleteOrderController);