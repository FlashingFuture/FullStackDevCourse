import { Router } from "express";
import {
  register,
  updateUserProfile,
  getUserProfile,
  loginUser,
} from "./controller/userController";
import {
  validateCreateUser,
  validateUpdateUser,
  validateLogin,
} from "./validator/userValidator";

const router = Router();

router.post("/register", validateCreateUser, register);
router.post("/login", validateLogin, loginUser);
router.put("/:id", validateUpdateUser, updateUserProfile);
router.get("/:id", getUserProfile);

export default router;
