import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { allCategory as allCategoryService } from "./service/allCategory";

export const allCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await allCategoryService();
  res.status(StatusCodes.OK).json(result);
};
