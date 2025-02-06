import { Types } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  stock?: number;
  image: string;
  discount?: number;

}
