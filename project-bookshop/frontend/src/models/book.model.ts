export interface BookItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  author: string;
  price: number;
  pubDate: string;
  imageURL: string;
}

export interface BookListResponse {
  books: BookItem[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}

export interface BookDetail {
  id: number;
  title: string;
  category: string;
  format: string;
  author: string;
  isbn: string;
  pages: number;
  summary: string;
  description: string;
  contents: string;
  price: number;
  likes: number;
  imageURL: string;
}
