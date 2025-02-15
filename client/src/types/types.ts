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