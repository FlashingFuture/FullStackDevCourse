import express from "express";
import * as userController from "./controller";

const router = express.Router();

router.post("/register", userController.registerUser);

export default router;
