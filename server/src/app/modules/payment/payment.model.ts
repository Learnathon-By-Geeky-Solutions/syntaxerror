import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  consumerId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Consumer ID is required"],
  },
  customerInfo: {
    fullName: String,
    contact: String,
    email: String,
    address: String,
    note: String,
  },
  orders: [
    {
      productId: String,
      title: String,
      image: String,
      price: Number,
      quantity: Number,
      stock: Number,
    },
  ],
  status: { type: String, default: "Pending" },
  sessionId: { type: String },
},
{
  timestamps: true, 
}
);

export const OrderModel = mongoose.model("Order", orderSchema);
