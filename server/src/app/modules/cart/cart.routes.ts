import express from "express";
import { auth } from "../../middlewares/auth";
import { CartController } from "./cart.controller";

const router = express.Router();

router.post("/",auth('Consumer'), CartController.addToCart);
router.get("/", auth('Consumer') ,CartController.getCart);
router.delete("/remove/:productId", auth('Consumer'), CartController.removeProductFromCart);
router.delete("/clear",auth('Consumer'), CartController.clearCart);
router.patch("/update", CartController.updateCartQuantity);

export const CartRoutes = router;