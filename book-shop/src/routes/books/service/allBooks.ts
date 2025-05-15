import { connection } from "@/database/mariadb";
import { BookItem, BookListResponse } from "../types/books.types";

export const allBooks = async (
  categoryId?: number
): Promise<BookListResponse> => {
  const sql = categoryId
    ? "SELECT id, title, category_id, summary, author, price, pub_date, image_url FROM books WHERE category_id = ?"
    : "SELECT id, title, category_id, summary, author, price, pub_date, image_url FROM books";
  const values = categoryId ? [categoryId] : [];
  const conn = await connection.getConnection();
  try {
    const [rows]: any = await conn.query(sql, values);

    if (rows.length === 0) {
      return {
        books: [],
        totalCount: 0,
        totalPage: 0,
        currentPage: 1,
      };
    }

    const books: BookItem[] = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      summary: row.summary,
      author: row.author,
      price: row.price,
      pubDate: row.pub_date,
      imageURL: row.image_url,
    }));

    return {
      books,
      totalCount: books.length,
      totalPage: 1,
      currentPage: 1,
    };
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
