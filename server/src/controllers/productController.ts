import { Request, Response } from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';

export const getProductsController = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Server error' });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Server error' });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    res.json({ message: 'Product deleted', product: deleted });
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Server error' });
  }
};