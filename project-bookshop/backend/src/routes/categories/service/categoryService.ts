import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../types/category";
import { db } from "../../../config/database";

export const createCategory = async (
  categoryData: CreateCategoryDto
): Promise<Category> => {
  const [result] = await db.query(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [categoryData.name, categoryData.description]
  );

  const [newCategory] = await db.query(
    "SELECT * FROM categories WHERE id = ?",
    [result.insertId]
  );

  return newCategory[0];
};

export const updateCategory = async (
  categoryData: UpdateCategoryDto
): Promise<Category> => {
  const updates: string[] = [];
  const values: any[] = [];

  if (categoryData.name) {
    updates.push("name = ?");
    values.push(categoryData.name);
  }

  if (categoryData.description) {
    updates.push("description = ?");
    values.push(categoryData.description);
  }

  values.push(categoryData.id);

  await db.query(
    `UPDATE categories SET ${updates.join(", ")} WHERE id = ?`,
    values
  );

  const [updatedCategory] = await db.query(
    "SELECT * FROM categories WHERE id = ?",
    [categoryData.id]
  );

  return updatedCategory[0];
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const [categories] = await db.query("SELECT * FROM categories WHERE id = ?", [
    id,
  ]);
  return categories[0];
};

export const getAllCategories = async (): Promise<Category[]> => {
  const [categories] = await db.query("SELECT * FROM categories");
  return categories;
};
