import { connection } from "@/database/mariadb";
import { BookItem, BookListResponse } from "../types/books.types";

export const allBooks = async (
  category?: string,
  isNew?: boolean,
  offset: number = 0,
  limit: number = 10
): Promise<BookListResponse> => {
  let sql = `
    SELECT books.id as id, categories.name as category, title, summary, author, price, pub_date, image_url
    FROM books
    LEFT JOIN categories ON books.category_id = categories.id
  `;
  const conditions: string[] = [];
  const values: any[] = [];

  if (category) {
    conditions.push("categories.name = ?");
    values.push(category);
  }

  if (isNew) {
    conditions.push("pub_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)");
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " ORDER BY pub_date DESC LIMIT ? OFFSET ?";
  values.push(limit, offset);

  const conn = await connection.getConnection();

  try {
    const [rows]: any = await conn.query(sql, values);

    const books: BookItem[] = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      summary: row.summary,
      author: row.author,
      price: row.price,
      pubDate: row.pub_date,
      imageURL: row.image_url,
    }));

    const countSql = `
      SELECT COUNT(*) as totalCount
      FROM books
      LEFT JOIN categories ON books.category_id = categories.id
      ${conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""}
    `;
    const [countRows]: any = await conn.query(
      countSql,
      values.slice(0, values.length - 2)
    );
    const totalCount = countRows[0]?.totalCount ?? 0;
    const totalPage = Math.ceil(totalCount / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    return {
      books,
      totalCount,
      totalPage,
      currentPage,
    };
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
