import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  categoryId: Joi.number().required(),
});

const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  description: Joi.string(),
  price: Joi.number().min(0),
  categoryId: Joi.number(),
});

export const validateCreateBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateUpdateBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
