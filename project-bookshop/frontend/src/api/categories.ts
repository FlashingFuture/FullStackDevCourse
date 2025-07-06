import axios from "axios";
import {
  Category,
  CategoryListResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../models/category.model";

const API_BASE = "/api/categories";

export async function getCategories(): Promise<CategoryListResponse> {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function getCategory(categoryId: number): Promise<Category> {
  const res = await axios.get(`${API_BASE}/${categoryId}`);
  return res.data;
}

export async function createCategory(
  categoryData: CreateCategoryDto
): Promise<Category> {
  const res = await axios.post(API_BASE, categoryData);
  return res.data;
}

export async function updateCategory(
  categoryData: UpdateCategoryDto
): Promise<Category> {
  const res = await axios.put(`${API_BASE}/${categoryData.id}`, categoryData);
  return res.data;
}
