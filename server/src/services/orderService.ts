import { Order } from '../models/Order';
import { adjustStock } from '../utils/stockUtils';
import { IOrder } from '../models/Order';

export const createOrder = async (userId: string, items: any[]) => {
  const total = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  const order = await Order.create({ user: userId, items, total, status: 'pending' });

  await adjustStock(items, 'deduct');
  return order;
};

export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  const status = newStatus.toLowerCase() as IOrder['status'];

  if (status === 'cancelled' && order.status !== 'cancelled') {
    await adjustStock(order.items, 'restore');
  }

  order.status = status;
  await order.save();
  return order;
};

export const deleteOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  await adjustStock(order.items, 'restore');
  await order.deleteOne();

  return order;
};