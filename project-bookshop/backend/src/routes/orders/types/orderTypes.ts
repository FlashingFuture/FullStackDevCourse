import { Types } from "mongoose";

export interface IOrderItem {
  bookId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  userId: Types.ObjectId;
  books: IOrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderResponse extends IOrder {
  _id: string;
}
