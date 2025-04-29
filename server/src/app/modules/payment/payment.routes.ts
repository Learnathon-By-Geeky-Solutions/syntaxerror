import express from "express";
import { createCheckoutSession, getAllOrders, getOrderById, insertOrderController, makeOrderComplete, markOrderAsPaid } from "./payment.controller";


const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/order", insertOrderController);
router.patch("/order/mark-paid", markOrderAsPaid);
router.get("/order",getOrderById);
router.get('/orders', getAllOrders);
router.patch('/order/:id', makeOrderComplete)

export const PaymentRoutes = router;