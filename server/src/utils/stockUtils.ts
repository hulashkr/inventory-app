import { Product } from '../models/Product';

export const adjustStock = async (
  items: { product: any; quantity: number }[],
  action: 'deduct' | 'restore'
) => {
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) continue;

    if (action === 'deduct') {
      product.quantity -= item.quantity;
    } else {
      product.quantity += item.quantity;
    }

    await product.save();
  }
};