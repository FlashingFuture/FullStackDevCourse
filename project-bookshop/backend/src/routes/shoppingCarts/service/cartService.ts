import {
  CartItem,
  CreateCartItemDto,
  UpdateCartItemDto,
  DeleteCartItemDto,
} from "../types/cart";
import { db } from "../../../config/database";

export const addToCart = async (
  cartItem: CreateCartItemDto
): Promise<CartItem> => {
  const [result] = await db.query(
    "INSERT INTO cart_items (user_id, book_id, quantity) VALUES (?, ?, ?)",
    [cartItem.userId, cartItem.bookId, cartItem.quantity]
  );

  const [newCartItem] = await db.query(
    "SELECT * FROM cart_items WHERE id = ?",
    [result.insertId]
  );

  return newCartItem[0];
};

export const updateCartItem = async (
  cartItem: UpdateCartItemDto
): Promise<CartItem> => {
  await db.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [
    cartItem.quantity,
    cartItem.id,
  ]);

  const [updatedItem] = await db.query(
    "SELECT * FROM cart_items WHERE id = ?",
    [cartItem.id]
  );

  return updatedItem[0];
};

export const removeFromCart = async (
  cartItem: DeleteCartItemDto
): Promise<void> => {
  await db.query("DELETE FROM cart_items WHERE id = ? AND user_id = ?", [
    cartItem.id,
    cartItem.userId,
  ]);
};

export const getUserCart = async (userId: number): Promise<CartItem[]> => {
  const [cartItems] = await db.query(
    `SELECT ci.*, b.title, b.price 
     FROM cart_items ci 
     JOIN books b ON ci.book_id = b.id 
     WHERE ci.user_id = ?`,
    [userId]
  );
  return cartItems;
};
