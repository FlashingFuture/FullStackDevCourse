import { Router } from "express";
import {
  addCategory,
  updateCategoryDetails,
  getCategory,
  getCategories,
} from "./controller/categoryController";
import {
  validateCreateCategory,
  validateUpdateCategory,
} from "./validator/categoryValidator";

const router = Router();

router.post("/", validateCreateCategory, addCategory);
router.put("/:id", validateUpdateCategory, updateCategoryDetails);
router.get("/:id", getCategory);
router.get("/", getCategories);

export default router;
