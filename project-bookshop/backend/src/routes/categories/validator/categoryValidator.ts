import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
});

export const validateCreateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createCategorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateUpdateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateCategorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
