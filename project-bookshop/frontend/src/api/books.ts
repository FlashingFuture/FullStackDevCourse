import axios from "axios";
import { BookListResponse, BookDetail } from "../models/book.model";

const API_BASE = "/api/books";

export async function getBooks(params?: {
  category?: string;
  isNew?: boolean;
  page?: number;
  limit?: number;
}): Promise<BookListResponse> {
  const { category, isNew, page = 1, limit = 10 } = params || {};
  const offset = (page - 1) * limit;
  const query = [
    category ? `category=${encodeURIComponent(category)}` : "",
    isNew ? `isNew=true` : "",
    `offset=${offset}`,
    `limit=${limit}`,
  ]
    .filter(Boolean)
    .join("&");
  const res = await axios.get(`${API_BASE}?${query}`);
  return res.data;
}

export async function getBookDetail(bookId: number): Promise<BookDetail> {
  const res = await axios.get(`${API_BASE}/${bookId}`);
  return res.data;
}
