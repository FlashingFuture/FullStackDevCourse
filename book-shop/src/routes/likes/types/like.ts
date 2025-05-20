export interface Like {
  id: number;
  userId: number;
  bookId: number;
  createdAt: Date;
}

export interface CreateLikeDto {
  userId: number;
  bookId: number;
}

export interface DeleteLikeDto {
  userId: number;
  bookId: number;
}
