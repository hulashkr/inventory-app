import { Request, Response } from 'express';
import { createOrder, updateOrderStatus, deleteOrder } from '../services/orderService';
import { Order } from '../models/Order';

export const getOrders = async (req: any, res: Response) => {
  try {
    const filter = req.user.role === 'staff' ? { user: req.user.id } : {};
    const orders = await Order.find(filter).populate('items.product', 'name sku price');
    res.json({ message: 'Orders fetched successfully', orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrderController = async (req: any, res: Response) => {
  try {
    const { items } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: 'Order items required' });

    const order = await createOrder(req.user.id, items);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatusController = async (req: Request, res: Response) => {
  try {
    const order = await updateOrderStatus(req.params.id, req.body.status);
    res.json({ message: `Order status updated to ${order.status}`, order });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    await deleteOrder(req.params.id);
    res.json({ message: 'Order deleted and stock restored' });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};