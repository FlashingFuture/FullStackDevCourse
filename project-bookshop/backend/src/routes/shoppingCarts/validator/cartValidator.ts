import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const cartItemSchema = Joi.object({
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const updateCartItemSchema = Joi.object({
  id: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const deleteCartItemSchema = Joi.object({
  id: Joi.number().required(),
  userId: Joi.number().required(),
});

export const validateCartItemInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = cartItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateUpdateCartItemInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateCartItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateDeleteCartItemInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = deleteCartItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
