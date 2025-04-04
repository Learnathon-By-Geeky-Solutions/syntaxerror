import { Types } from "mongoose";

export interface CustomerInfo {
  fullName: string;
  contact: string;
  email: string;
  address: string;
  note?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

export type OrderStatus = "Pending" | "Paid" | "Completed";

export interface Order {
  consumerId: Types.ObjectId;
  customerInfo: CustomerInfo;
  orders: OrderItem[];
  status?: OrderStatus;
  sessionId?: string;
}
