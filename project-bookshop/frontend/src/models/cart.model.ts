export interface CartItem {
  id: number;
  userId: number;
  bookId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  price?: number;
}

export interface CreateCartItemDto {
  userId: number;
  bookId: number;
  quantity: number;
}

export interface UpdateCartItemDto {
  id: number;
  quantity: number;
}

export interface DeleteCartItemDto {
  id: number;
  userId: number;
}
