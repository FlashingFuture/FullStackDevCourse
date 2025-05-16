import { Response } from "express";
import { HTTPError } from "./httpError";
import { StatusCodes } from "http-status-codes";

export const sendErrorResponse = (res: Response, error: unknown): void => {
  console.log("[서버 에러]", error);

  if (error instanceof HTTPError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof Error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
    return;
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "알 수 없는 오류입니다." });
};
