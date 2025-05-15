import { connection } from "@/database/mariadb";
import { CategoryList, CategoryListResponse } from "../types/categories.types";

export const allCategory = async (): Promise<CategoryListResponse> => {
  const sql = "SELECT * FROM categories";

  const conn = await connection.getConnection();
  try {
    const [rows]: any = await conn.query(sql);

    if (rows.length === 0) {
      return {
        categories: [],
      };
    }

    const categories: CategoryList[] = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
    }));

    return {
      categories,
    };
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
