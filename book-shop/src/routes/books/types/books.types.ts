export type BookItem = {
  id: number;
  title: string;
  category?: string;
  summary: string;
  author: string;
  price: number;
  pubDate: string;
  imageURL?: string;
  likes?: number;
};

export type BookListResponse = {
  books: BookItem[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
};

export type BookDetail = {
  id: number;
  title: string;
  category?: string;
  format: "종이책" | "전자책";
  author: string;
  isbn: string;
  pages: number;
  summary: string;
  description: string;
  contents: string;
  price: number;
  likes?: number;
  userLiked?: boolean;
  imageURL: string;
};

export type CategoryList = {
  id: number;
  name: string;
};

export type CategoryListResponse = {
  categories: CategoryList[];
};
