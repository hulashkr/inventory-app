import { Router } from 'express';
import { Product } from '../models/Product';
import { protect } from '../middleware/auth';

export const productRouter = Router();

// @desc Get all products
// @route GET /api/products
// @access Private (all logged-in users)
productRouter.get('/', protect(['admin', 'staff']), async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Create product
// @route POST /api/products
// @access Private (admin only)
productRouter.post('/', protect(['admin']), async (req, res) => {
  try {
    const { name, sku, quantity, price } = req.body;
    const exists = await Product.findOne({ sku });
    if (exists) return res.status(400).json({ message: 'SKU already exists' });

    const product = await Product.create({ name, sku, quantity, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Update product
// @route PUT /api/products/:id
// @access Private (admin only)
productRouter.put('/:id', protect(['admin']), async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private (admin only)
productRouter.delete('/:id', protect(['admin']), async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});