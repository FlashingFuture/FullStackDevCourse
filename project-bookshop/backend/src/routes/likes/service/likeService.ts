import { Like, CreateLikeDto, DeleteLikeDto } from "../types/like";
import { db } from "../../../config/database";

export const createLike = async (likeData: CreateLikeDto): Promise<Like> => {
  const [result] = await db.query(
    "INSERT INTO likes (user_id, book_id) VALUES (?, ?)",
    [likeData.userId, likeData.bookId]
  );

  const [newLike] = await db.query("SELECT * FROM likes WHERE id = ?", [
    result.insertId,
  ]);

  return newLike[0];
};

export const deleteLike = async (likeData: DeleteLikeDto): Promise<void> => {
  await db.query("DELETE FROM likes WHERE user_id = ? AND book_id = ?", [
    likeData.userId,
    likeData.bookId,
  ]);
};

export const getUserLikes = async (userId: number): Promise<Like[]> => {
  const [likes] = await db.query("SELECT * FROM likes WHERE user_id = ?", [
    userId,
  ]);
  return likes;
};

export const getBookLikes = async (bookId: number): Promise<Like[]> => {
  const [likes] = await db.query("SELECT * FROM likes WHERE book_id = ?", [
    bookId,
  ]);
  return likes;
};
