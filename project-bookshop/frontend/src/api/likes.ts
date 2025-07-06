import axios from "axios";
import { Like, CreateLikeDto, DeleteLikeDto } from "../models/like.model";

const API_BASE = "/api/likes";

export async function addLike(likeData: CreateLikeDto): Promise<Like> {
  const res = await axios.post(API_BASE, likeData);
  return res.data;
}

export async function removeLike(
  likeData: DeleteLikeDto
): Promise<{ message: string }> {
  const res = await axios.delete(API_BASE, { data: likeData });
  return res.data;
}

export async function getLikesByUser(userId: number): Promise<Like[]> {
  const res = await axios.get(`${API_BASE}/user/${userId}`);
  return res.data;
}

export async function getLikesByBook(bookId: number): Promise<Like[]> {
  const res = await axios.get(`${API_BASE}/book/${bookId}`);
  return res.data;
}
