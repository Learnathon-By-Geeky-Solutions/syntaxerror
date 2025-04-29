import { Request, Response } from "express";
import { Types } from "mongoose";
import { UserModel } from "../user/user.model";
import { CustomerInfo, OrderItem } from "./payment.interface";
import { OrderModel } from "./payment.model";
import { createCheckoutSessionService, getAllOrdersService, getOrderByIdService, makeOrderCompleteService } from "./payment.service";

interface CreateCheckoutSessionBody {
  orders: OrderItem[];
  customerInfo: CustomerInfo;
}

export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orders, customerInfo }: CreateCheckoutSessionBody = req.body;
    console.log("Customer Info Email:", customerInfo.email);

    // const consumerEmail = (req.user as { email: string })?.email;
    // if (!consumerEmail) {
    //   res.status(401).json({ message: "Unauthorized: Email missing" });
    //   return;
    // }

    const consumer = await UserModel.findOne({ email: customerInfo.email });
    if (!consumer) {
      res.status(400).json({ message: "Consumer not found" });
      return;
    }

    const sessionUrl = await createCheckoutSessionService(
      orders,
      customerInfo,
      consumer._id as Types.ObjectId
    );

    res.status(200).json({ url: sessionUrl });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
};

export const insertOrderController = async (req: Request, res: Response) => {
  try {
    const { consumerId, customerInfo, orders, status, sessionId } = req.body;

    const order = await OrderModel.create({
      consumerId,
      customerInfo,
      orders,
      status,
      sessionId
    });

    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.error("Error inserting order:", error);
    res.status(500).json({ message: "Failed to insert order" });
  }
};


export const markOrderAsPaid = async (req: Request, res: Response): Promise<void> => {
  const { session_id } = req.body;

  if (!session_id) {
    res.status(400).json({ message: "Session ID is required" });
    return;
  }

  try {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { sessionId: session_id },
      { status: "Paid" },   
      { new: true }         
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json({ message: "Order marked as Paid", updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

// Optional
export const markOrderPaid = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    await OrderModel.findOneAndUpdate(
      { sessionId },
      { status: "Paid" },
      { new: true }
    );

    res.status(200).json({ message: "Order marked as paid" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { email } = req.query;
  if (!email) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const result = await getOrderByIdService(email as string);
  if (!result) {
    res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json({ message: "Order retrieved successfully", data: result });
}

export const getAllOrders = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const orderId = req.query.orderId as string;

  const result = await getAllOrdersService(page, limit, orderId);

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    meta: result.meta,
    data: result.orders,
  });
};

export const makeOrderComplete = async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await makeOrderCompleteService(id);
  if (!result) {
    res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json({ message: "Order marked as completed", data: result });
}

export const PaymentController = {
  createCheckoutSession,
  insertOrderController,
  markOrderAsPaid,
  getOrderById,
  getAllOrders,
  makeOrderComplete
};
