import { Product } from '../models/Product';

export const getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export const createProduct = async (data: { name: string; sku: string; quantity: number; price: number }) => {
  const exists = await Product.findOne({ sku: data.sku });
  if (exists) throw new Error('SKU already exists');
  return await Product.create(data);
};

export const updateProduct = async (id: string, data: any) => {
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Product not found');
  return updated;
};

export const deleteProduct = async (id: string) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new Error('Product not found');
  return deleted;
};