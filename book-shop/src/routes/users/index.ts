import express from "express";
import * as userController from "./controller";
import {
  registerValidator,
  loginValidator,
  requestPasswordResetValidator,
  applyPasswordResetValidator,
} from "./validator";

const router = express.Router();

router.post("/register", ...registerValidator, userController.registerUser);
router.post("/login", ...loginValidator, userController.loginUser);
router.post(
  "/reset-password/request",
  ...requestPasswordResetValidator,
  userController.requestPasswordReset
);
router.post(
  "/reset-password/confirm",
  ...applyPasswordResetValidator,
  userController.applyPasswordReset
);

export default router;
