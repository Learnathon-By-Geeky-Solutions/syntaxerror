import { model, Schema } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>(
  {
    consumerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Consumer ID is required"],
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number, 
          required: [true, "Product price is required"],
          min: [0, "Price must be a positive value"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CartModel = model<ICart>("Cart", cartSchema);
