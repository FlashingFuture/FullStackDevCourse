import React from "react";
import { Link } from "react-router-dom";
import { BookItem } from "../../models/book.model";
import { addItemToCart } from "../../api/cart";
import { addLike, removeLike } from "../../api/likes";
import { useAuth } from "../../context/AuthContext";
import "./BookCard.css";

interface BookCardProps {
  book: BookItem;
  isLiked?: boolean;
  onLikeToggle?: () => void;
}

export default function BookCard({
  book,
  isLiked = false,
  onLikeToggle,
}: BookCardProps) {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      await addItemToCart({
        userId: user.id,
        bookId: book.id,
        quantity: 1,
      });
      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart");
    }
  };

  const handleLikeToggle = async () => {
    if (!user) {
      alert("Please login to like books");
      return;
    }

    try {
      if (isLiked) {
        await removeLike({
          userId: user.id,
          bookId: book.id,
        });
      } else {
        await addLike({
          userId: user.id,
          bookId: book.id,
        });
      }
      onLikeToggle?.();
    } catch (error) {
      console.error("Failed to toggle like:", error);
      alert("Failed to update like");
    }
  };

  return (
    <div className="book-card">
      <div className="book-image">
        <img
          src={book.imageURL || "/placeholder-book.jpg"}
          alt={book.title}
          onError={(e) => {
            e.currentTarget.src = "/placeholder-book.jpg";
          }}
        />
        {user && (
          <button
            className={`like-button ${isLiked ? "liked" : ""}`}
            onClick={handleLikeToggle}
            title={isLiked ? "Remove from likes" : "Add to likes"}
          >
            ❤️
          </button>
        )}
      </div>

      <div className="book-info">
        <Link to={`/book/${book.id}`} className="book-title">
          {book.title}
        </Link>
        <p className="book-author">by {book.author}</p>
        <p className="book-category">{book.category}</p>
        <p className="book-summary">{book.summary}</p>
        <div className="book-footer">
          <span className="book-price">${book.price}</span>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!user}
          >
            {user ? "Add to Cart" : "Login to Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
