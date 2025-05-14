import express from "express";
import * as userController from "./controller";
import {
  registerValidator,
  loginValidator,
  requestPasswordResetValidator,
  applyPasswordResetValidator,
} from "./validator";
import { validateRequest } from "@/middlewares/validateRequest";

const router = express.Router();

router.post(
  "/register",
  ...registerValidator,
  validateRequest,
  userController.registerUser
);
router.post(
  "/login",
  ...loginValidator,
  validateRequest,
  userController.loginUser
);
router.post(
  "/reset-password/request",
  ...requestPasswordResetValidator,
  validateRequest,
  userController.requestPasswordReset
);
router.post(
  "/reset-password/confirm",
  ...applyPasswordResetValidator,
  validateRequest,
  userController.applyPasswordReset
);

export default router;
