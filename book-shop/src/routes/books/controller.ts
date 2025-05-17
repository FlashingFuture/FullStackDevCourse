import { Request, Response } from "express";
import { allBooks as allBooksService } from "./service/allBooks";
import { bookDetail as bookDetailService } from "./service/bookDetail";
import { StatusCodes } from "http-status-codes";

export const allBooks = async (req: Request, res: Response): Promise<void> => {
  const category = req.query.category as string | undefined;
  const isNew = req.query.isNew === "true";
  const offset = parseInt(req.query.offset as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await allBooksService(category, isNew, offset, limit);
  res.status(StatusCodes.OK).json(result);
};

export const bookDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const booksId = Number(req.params.booksId);
  const result = await bookDetailService(booksId);
  res.status(StatusCodes.OK).json(result);
};
