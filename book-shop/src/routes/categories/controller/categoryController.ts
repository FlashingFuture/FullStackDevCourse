import { Request, Response } from "express";
import {
  createCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
} from "../service/categoryService";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const updateCategoryDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryData = { id: Number(id), ...req.body };
    const category = await updateCategory(categoryData);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(Number(id));
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};
