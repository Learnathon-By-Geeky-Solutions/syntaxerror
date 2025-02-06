import express from "express";
import { ProductController } from "./product.controller";
const router = express.Router();

router.get("/", ProductController.findAllProducts);
router.post("/", ProductController.addProduct);
router.get("/:id", ProductController.getProductById);
router.patch("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;