import Book from "../../../database/models/Book";
import { IBook } from "../types";

export const getAllBooks = async () => {
  return await Book.find();
};

export const getBookById = async (id: string) => {
  return await Book.findById(id);
};

export const createBook = async (bookData: IBook) => {
  const book = new Book(bookData);
  return await book.save();
};

export const updateBook = async (id: string, bookData: Partial<IBook>) => {
  return await Book.findByIdAndUpdate(id, bookData, { new: true });
};

export const deleteBook = async (id: string) => {
  return await Book.findByIdAndDelete(id);
};
