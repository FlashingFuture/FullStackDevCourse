import { query, param } from "express-validator";
import { validateRequest } from "@/middlewares/validateRequest";

export const validateAllBooks = [
  query("categoryId")
    .optional()
    .isString()
    .withMessage(
      "잘못된 요청입니다. /books/?category=카테고리명명 형식으로 요청해주세요."
    ),
  validateRequest,
];

export const validateBookDetail = [
  param("booksId")
    .isInt({ min: 1 })
    .withMessage("잘못된 요청입니다. /books/1 형식으로 요청해주세요."),
  validateRequest,
];
