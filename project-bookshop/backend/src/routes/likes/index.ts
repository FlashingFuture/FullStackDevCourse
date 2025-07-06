import { Router } from "express";
import {
  addLike,
  removeLike,
  getLikesByUser,
  getLikesByBook,
} from "./controller/likeController";
import { validateLikeInput } from "./validator/likeValidator";

const router = Router();

router.post("/", validateLikeInput, addLike);
router.delete("/", validateLikeInput, removeLike);
router.get("/user/:userId", getLikesByUser);
router.get("/book/:bookId", getLikesByBook);

export default router;
