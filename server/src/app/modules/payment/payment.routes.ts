import express from "express";
import { createCheckoutSession, getOrderById, insertOrderController, markOrderAsPaid } from "./payment.controller";


const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/order", insertOrderController);
router.patch("/order/mark-paid", markOrderAsPaid);
router.get("/order",getOrderById);

export const PaymentRoutes = router;