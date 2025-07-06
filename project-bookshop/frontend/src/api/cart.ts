import axios from "axios";
import {
  CartItem,
  CreateCartItemDto,
  UpdateCartItemDto,
  DeleteCartItemDto,
} from "../models/cart.model";

const API_BASE = "/api/shoppingCarts";

export async function addItemToCart(
  cartData: CreateCartItemDto
): Promise<CartItem> {
  const res = await axios.post(API_BASE, cartData);
  return res.data;
}

export async function updateItemQuantity(
  cartData: UpdateCartItemDto
): Promise<CartItem> {
  const res = await axios.put(API_BASE, cartData);
  return res.data;
}

export async function removeItemFromCart(
  cartData: DeleteCartItemDto
): Promise<{ message: string }> {
  const res = await axios.delete(API_BASE, { data: cartData });
  return res.data;
}

export async function getCart(userId: number): Promise<CartItem[]> {
  const res = await axios.get(`${API_BASE}/${userId}`);
  return res.data;
}
