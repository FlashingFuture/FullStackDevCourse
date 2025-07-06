import { Book, CreateBookDto, UpdateBookDto } from "../types/book";
import { db } from "../../../config/database";

export const createBook = async (bookData: CreateBookDto): Promise<Book> => {
  const [result] = await db.query(
    "INSERT INTO books (title, author, description, price, category_id) VALUES (?, ?, ?, ?, ?)",
    [
      bookData.title,
      bookData.author,
      bookData.description,
      bookData.price,
      bookData.categoryId,
    ]
  );

  const [newBook] = await db.query("SELECT * FROM books WHERE id = ?", [
    result.insertId,
  ]);

  return newBook[0];
};

export const updateBook = async (bookData: UpdateBookDto): Promise<Book> => {
  const updates: string[] = [];
  const values: any[] = [];

  if (bookData.title) {
    updates.push("title = ?");
    values.push(bookData.title);
  }

  if (bookData.author) {
    updates.push("author = ?");
    values.push(bookData.author);
  }

  if (bookData.description) {
    updates.push("description = ?");
    values.push(bookData.description);
  }

  if (bookData.price) {
    updates.push("price = ?");
    values.push(bookData.price);
  }

  if (bookData.categoryId) {
    updates.push("category_id = ?");
    values.push(bookData.categoryId);
  }

  values.push(bookData.id);

  await db.query(`UPDATE books SET ${updates.join(", ")} WHERE id = ?`, values);

  const [updatedBook] = await db.query("SELECT * FROM books WHERE id = ?", [
    bookData.id,
  ]);

  return updatedBook[0];
};

export const getBookById = async (id: number): Promise<Book> => {
  const [books] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
  return books[0];
};

export const getAllBooks = async (): Promise<Book[]> => {
  const [books] = await db.query("SELECT * FROM books");
  return books;
};

export const getBooksByCategory = async (
  categoryId: number
): Promise<Book[]> => {
  const [books] = await db.query("SELECT * FROM books WHERE category_id = ?", [
    categoryId,
  ]);
  return books;
};
