import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const likeSchema = Joi.object({
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
});

export const validateLikeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = likeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
