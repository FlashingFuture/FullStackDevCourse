import express from "express";
import * as orderController from "./controller";
import { authenticate } from "../../middlewares/auth";

const router = express.Router();

// 모든 라우트에 인증 미들웨어 적용
router.use(authenticate);

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;
