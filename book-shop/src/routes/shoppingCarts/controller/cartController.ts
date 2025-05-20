import { Request, Response } from "express";
import {
  addToCart,
  updateCartItem,
  removeFromCart,
  getUserCart,
} from "../service/cartService";

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { userId, bookId, quantity } = req.body;
    const cartItem = await addToCart({ userId, bookId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

export const updateItemQuantity = async (req: Request, res: Response) => {
  try {
    const { id, quantity } = req.body;
    const cartItem = await updateCartItem({ id, quantity });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.body;
    await removeFromCart({ id, userId });
    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cartItems = await getUserCart(Number(userId));
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};
