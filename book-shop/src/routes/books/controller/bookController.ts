import { Request, Response } from "express";
import {
  createBook,
  updateBook,
  getBookById,
  getAllBooks,
  getBooksByCategory,
} from "../service/bookService";

export const addBook = async (req: Request, res: Response) => {
  try {
    const book = await createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};

export const updateBookDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookData = { id: Number(id), ...req.body };
    const book = await updateBook(bookData);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await getBookById(Number(id));
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

export const getCategoryBooks = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const books = await getBooksByCategory(Number(categoryId));
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category books", error });
  }
};
