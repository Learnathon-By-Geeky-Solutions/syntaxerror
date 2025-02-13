import express from "express";
import upload from "../../utils/multer";
import { CategoryController } from "./category.controller";
const router = express.Router();
 
router.post("/", upload.single("image"), CategoryController.addCategory);
router.patch("/:id", upload.single("image"), CategoryController.updateCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getById);
router.delete("/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;