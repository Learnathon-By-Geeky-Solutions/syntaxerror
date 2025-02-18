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

// export type TProductManage ={
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   category: {
//     _id: string;
//     name: string;
//     image: string;
//   };
//   stock: number;
//   image: string;
//   discount: number;
//   createdAt: string;
//   updatedAt: string;
// }