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

  export type TProductCart ={
    price: number;
    productId: {
      image: string;
      title: string;
      _id: string;
    };
    quantity: number;
  }
  