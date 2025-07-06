export interface OrderItem {
  bookId: string;
  quantity: number;
  price: number;
}

export interface Order {
  userId: string;
  books: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderResponse extends Order {
  _id: string;
}

export interface CreateOrderDto {
  books: OrderItem[];
  totalAmount: number;
}

export interface UpdateOrderDto {
  status?: "pending" | "processing" | "completed" | "cancelled";
  books?: OrderItem[];
  totalAmount?: number;
}
