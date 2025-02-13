import { Types } from "mongoose";

export interface ICart {
  consumerId: Types.ObjectId;
  products: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
  }[];
}
