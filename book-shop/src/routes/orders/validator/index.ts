import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { books, totalAmount } = req.body;

  if (!books || !Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ message: "주문할 책 정보가 필요합니다." });
  }

  for (const book of books) {
    if (!book.bookId || !Types.ObjectId.isValid(book.bookId)) {
      return res.status(400).json({ message: "유효한 책 ID가 필요합니다." });
    }
    if (!book.quantity || book.quantity < 1) {
      return res.status(400).json({ message: "유효한 수량이 필요합니다." });
    }
    if (!book.price || book.price < 0) {
      return res.status(400).json({ message: "유효한 가격이 필요합니다." });
    }
  }

  if (!totalAmount || totalAmount < 0) {
    return res.status(400).json({ message: "유효한 총 금액이 필요합니다." });
  }

  next();
};
