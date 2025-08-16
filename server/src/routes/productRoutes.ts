import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  getProductsController,
  createProductController,
  updateProductController,
  deleteProductController
} from '../controllers/productController';

export const productRouter = Router();

productRouter.get('/', protect(['admin', 'staff']), getProductsController);
productRouter.post('/', protect(['admin']), createProductController);
productRouter.put('/:id', protect(['admin']), updateProductController);
productRouter.delete('/:id', protect(['admin']), deleteProductController);