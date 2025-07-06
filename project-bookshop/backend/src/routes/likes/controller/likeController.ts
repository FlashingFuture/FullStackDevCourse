import { Request, Response } from "express";
import {
  createLike,
  deleteLike,
  getUserLikes,
  getBookLikes,
} from "../service/likeService";

export const addLike = async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.body;
    const like = await createLike({ userId, bookId });
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: "Error creating like", error });
  }
};

export const removeLike = async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.body;
    await deleteLike({ userId, bookId });
    res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing like", error });
  }
};

export const getLikesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const likes = await getUserLikes(Number(userId));
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user likes", error });
  }
};

export const getLikesByBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const likes = await getBookLikes(Number(bookId));
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book likes", error });
  }
};
