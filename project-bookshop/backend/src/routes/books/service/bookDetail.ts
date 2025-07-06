import { connection } from "@/database/mariadb";
import { HTTPError } from "@/utils/httpError";
import { BookDetail } from "../types/books.types";

export const bookDetail = async (id: number): Promise<BookDetail> => {
  const sql = `
    SELECT *
    FROM books
    WHERE id = ?
  `;

  const conn = await connection.getConnection();
  try {
    const [rows]: any = await conn.query(sql, [id]);

    if (rows.length === 0) {
      throw new HTTPError(404, "책이 존재하지 않습니다.");
    }

    const book = rows[0];

    return {
      id: book.id,
      title: book.title,
      category: book.category,
      format: book.format,
      author: book.author,
      isbn: book.isbn,
      pages: book.pages,
      summary: book.summary,
      description: book.description,
      contents: book.contents,
      price: book.price,
      likes: book.likes,
      imageURL: book.image_url,
    };
  } finally {
    conn.release();
  }
};
