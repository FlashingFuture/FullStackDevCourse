import express from "express";
import * as userController from "./controller";

const router = express.Router();

router.get("/", userController.allCategory);

export default router;
