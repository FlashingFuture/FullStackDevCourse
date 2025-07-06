import axios from "axios";
import {
  OrderResponse,
  CreateOrderDto,
  UpdateOrderDto,
} from "../models/order.model";

const API_BASE = "/api/orders";

export async function getAllOrders(): Promise<OrderResponse[]> {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function getOrderById(orderId: string): Promise<OrderResponse> {
  const res = await axios.get(`${API_BASE}/${orderId}`);
  return res.data;
}

export async function createOrder(
  orderData: CreateOrderDto
): Promise<OrderResponse> {
  const res = await axios.post(API_BASE, orderData);
  return res.data;
}

export async function updateOrder(
  orderId: string,
  orderData: UpdateOrderDto
): Promise<OrderResponse> {
  const res = await axios.put(`${API_BASE}/${orderId}`, orderData);
  return res.data;
}

export async function deleteOrder(
  orderId: string
): Promise<{ message: string }> {
  const res = await axios.delete(`${API_BASE}/${orderId}`);
  return res.data;
}
