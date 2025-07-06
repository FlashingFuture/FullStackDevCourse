import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, updateItemQuantity, removeItemFromCart } from "../api/cart";
import { CartItem } from "../models/cart.model";
import { useAuth } from "../context/AuthContext";
import "./Cart.css";

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const items = await getCart(user.id);
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (!user) return;

    setUpdatingItems((prev) => new Set(prev).add(itemId));

    try {
      await updateItemQuantity({ id: itemId, quantity: newQuantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update quantity");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    if (!user) return;

    if (!confirm("Are you sure you want to remove this item?")) return;

    setUpdatingItems((prev) => new Set(prev).add(itemId));

    try {
      await removeItemFromCart({ id: itemId, userId: user.id });
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <div className="cart-loading">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        {cartItems.length > 0 && (
          <p className="cart-count">{cartItems.length} item(s)</p>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some books to get started!</p>
          <button
            onClick={() => navigate("/")}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src="/placeholder-book.jpg"
                    alt={item.title || "Book"}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-book.jpg";
                    }}
                  />
                </div>

                <div className="item-details">
                  <h3 className="item-title">{item.title || "Unknown Book"}</h3>
                  <p className="item-price">${item.price || 0}</p>
                </div>

                <div className="item-quantity">
                  <label>Quantity:</label>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    disabled={updatingItems.has(item.id)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="item-total">
                  <span>${((item.price || 0) * item.quantity).toFixed(2)}</span>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-item-btn"
                  disabled={updatingItems.has(item.id)}
                >
                  {updatingItems.has(item.id) ? "..." : "🗑️"}
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
