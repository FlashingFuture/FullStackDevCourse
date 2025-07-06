import { registerUser as registerUserService } from "./service/registerUser";
import { loginUser as loginUserService } from "./service/loginUser";
import { requestPasswordReset as requestPasswordResetService } from "./service/requestPasswordReset";
import { applyPasswordReset as applyPasswordResetService } from "./service/applyPasswordReset";
import { Request, Response } from "express";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await registerUserService(req.body);
  res.status(result.status).json({ message: result.message });
  return;
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const result = await loginUserService(req.body);
  res
    .status(result.status)
    .json({ message: result.message, token: result.token });
  return;
};

export const requestPasswordReset = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await requestPasswordResetService(req.body.email);
  res.status(result.status).json({ message: result.message });
};

export const applyPasswordReset = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, newPassword } = req.body;
  const result = await applyPasswordResetService(email, newPassword);
  res.status(result.status).json({ message: result.message });
};
