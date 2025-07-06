export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookDto {
  title: string;
  author: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface UpdateBookDto {
  id: number;
  title?: string;
  author?: string;
  description?: string;
  price?: number;
  categoryId?: number;
}
