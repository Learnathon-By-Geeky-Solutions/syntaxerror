export type TProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  discount: number;
  category: string;
}

export type TProductCart = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  _id: string;
}

export interface Order {
  _id: string;
  customerInfo: {
    fullName: string;
    contact: string;
    email: string;
    address: string;
    note: string;
  };
  orders: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
