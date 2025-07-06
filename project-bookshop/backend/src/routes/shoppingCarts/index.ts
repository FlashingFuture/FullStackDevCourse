import { Router } from "express";
import {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  getCart,
} from "./controller/cartController";
import {
  validateCartItemInput,
  validateUpdateCartItemInput,
  validateDeleteCartItemInput,
} from "./validator/cartValidator";

const router = Router();

router.post("/", validateCartItemInput, addItemToCart);
router.put("/", validateUpdateCartItemInput, updateItemQuantity);
router.delete("/", validateDeleteCartItemInput, removeItemFromCart);
router.get("/:userId", getCart);

export default router;
