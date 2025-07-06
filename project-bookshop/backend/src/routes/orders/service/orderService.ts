import Order from "../../../database/models/Order";
import { IOrder } from "../types/orderTypes";

export const getAllOrders = async (userId: string) => {
  return await Order.find({ userId }).populate("books.bookId");
};

export const getOrderById = async (orderId: string, userId: string) => {
  return await Order.findOne({ _id: orderId, userId }).populate("books.bookId");
};

export const createOrder = async (orderData: IOrder) => {
  const order = new Order(orderData);
  return await order.save();
};

export const updateOrder = async (
  orderId: string,
  userId: string,
  orderData: Partial<IOrder>
) => {
  return await Order.findOneAndUpdate({ _id: orderId, userId }, orderData, {
    new: true,
  }).populate("books.bookId");
};

export const deleteOrder = async (orderId: string, userId: string) => {
  return await Order.findOneAndDelete({ _id: orderId, userId });
};
