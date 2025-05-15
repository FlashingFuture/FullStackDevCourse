import { Request, Response } from "express";
import { allBooks as allBooksService } from "./service/allBooks";
import { bookDetail as bookDetailService } from "./service/bookDetail";
import { StatusCodes } from "http-status-codes";

export const allBooks = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.query.categoryId
    ? Number(req.query.categoryId)
    : undefined;
  if (categoryId !== undefined && isNaN(categoryId)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "유효하지 않은 카테고리 ID입니다." });
    return;
  }

  const result = await allBooksService(categoryId);
  res.status(StatusCodes.OK).json(result);
};

export const bookDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const booksId = Number(req.params.booksId);
  if (isNaN(booksId)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "유효하지 않은 ID입니다." });
    return;
  }

  const result = await bookDetailService(booksId);
  res.status(StatusCodes.OK).json(result);
};
