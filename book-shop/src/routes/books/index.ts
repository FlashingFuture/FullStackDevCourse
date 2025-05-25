import express from "express";
import * as bookController from "./controller";
import { validateAllBooks, validateBookDetail } from "./validator";

const router = express.Router();

router.get("/", validateAllBooks, bookController.allBooks);
router.get("/:booksId", validateBookDetail, bookController.bookDetail);

export default router;
