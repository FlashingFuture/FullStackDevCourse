import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookDetail } from "../api/books";
import { BookDetail } from "../models/book.model";
import { addItemToCart } from "../api/cart";
import { addLike, removeLike } from "../api/likes";
import { useAuth } from "../context/AuthContext";
import "./Detail.css";

export default function Detail() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (bookId) {
      fetchBookDetail();
    }
  }, [bookId]);

  const fetchBookDetail = async () => {
    if (!bookId) return;

    setIsLoading(true);
    try {
      const bookData = await getBookDetail(parseInt(bookId));
      setBook(bookData);
    } catch (error) {
      console.error("Failed to fetch book detail:", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    if (!book) return;

    try {
      await addItemToCart({
        userId: user.id,
        bookId: book.id,
        quantity,
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

    if (!book) return;

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
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      alert("Failed to update like");
    }
  };

  if (isLoading) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="detail-error">
        <p>Book not found</p>
        <button onClick={() => navigate("/")}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-content">
        <div className="book-image-section">
          <img
            src={book.imageURL || "/placeholder-book.jpg"}
            alt={book.title}
            className="book-detail-image"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-book.jpg";
            }}
          />
          {user && (
            <button
              className={`like-button-detail ${isLiked ? "liked" : ""}`}
              onClick={handleLikeToggle}
            >
              {isLiked ? "❤️ Liked" : "🤍 Like"}
            </button>
          )}
        </div>

        <div className="book-info-section">
          <h1 className="book-title-detail">{book.title}</h1>
          <p className="book-author-detail">by {book.author}</p>

          <div className="book-meta">
            <span className="book-category-detail">{book.category}</span>
            <span className="book-format">{book.format}</span>
            <span className="book-pages">{book.pages} pages</span>
            <span className="book-isbn">ISBN: {book.isbn}</span>
          </div>

          <div className="book-price-section">
            <span className="book-price-detail">${book.price}</span>
            <span className="book-likes">❤️ {book.likes} likes</span>
          </div>

          <div className="book-description">
            <h3>Summary</h3>
            <p>{book.summary}</p>

            <h3>Description</h3>
            <p>{book.description}</p>

            {book.contents && (
              <>
                <h3>Table of Contents</h3>
                <p>{book.contents}</p>
              </>
            )}
          </div>

          <div className="book-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="add-to-cart-detail"
              onClick={handleAddToCart}
              disabled={!user}
            >
              {user ? `Add ${quantity} to Cart` : "Login to Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
