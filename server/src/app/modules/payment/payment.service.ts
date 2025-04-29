import { Types } from "mongoose";
import Stripe from "stripe";
import { UserModel } from "../user/user.model";
import { CustomerInfo, OrderItem } from "./payment.interface";
import { OrderModel } from "./payment.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // match your Stripe version
});

export const createCheckoutSessionService = async (
  orders: OrderItem[],
  customerInfo: CustomerInfo,
  consumerId: Types.ObjectId
): Promise<string> => {
  const exchangeRate = 126.4064;

  const line_items = orders.map((item) => {
    const priceInUSD = item.price / exchangeRate;
    const priceInCents = Math.round(priceInUSD * 100);

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: priceInCents,
      },
      quantity: item.quantity,
    };
  });

  const order = await OrderModel.create({
    consumerId,
    customerInfo,
    orders,
    status: "Pending",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    metadata: {
      orderId: order._id.toString(), 
    },
  });

  order.sessionId = session.id;
  await order.save();

  return session.url!;
};

export const getOrderByIdService = async (email: string) => {
  const getConsumerId = await UserModel.findOne({email: email});
  if (!getConsumerId) {
    throw new Error("Consumer not found");
  }
  const consumerId = getConsumerId._id as Types.ObjectId;
  const order = await OrderModel.find({ consumerId: consumerId });
  return order;
}

export const getAllOrdersService = async (
  page: number, 
  limit: number,
  orderId?: string
) => {
  // Build query based on orderId if provided
  const query = orderId ? { _id: new Types.ObjectId(orderId) } : {};

  // Calculate skip value for pagination
  const skip = (page - 1) * limit;

  // Get total count of orders matching the query
  const total = await OrderModel.countDocuments(query);

  // Fetch paginated and filtered orders
  const orders = await OrderModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('consumerId', 'name email');

  return {
    orders,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    },
  };
};

export const makeOrderCompleteService = async (orderId: string) => {
  const order = await OrderModel.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  order.status = "Completed";
  await order.save();
  return order;
}