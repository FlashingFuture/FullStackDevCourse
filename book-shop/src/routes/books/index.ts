import express from "express";
import * as userController from "./controller";
import { validateAllBooks, validateBookDetail } from "./validator";

const router = express.Router();

router.get("/", validateAllBooks, userController.allBooks);
router.get("/:booksId", validateBookDetail, userController.bookDetail);

export default router;
