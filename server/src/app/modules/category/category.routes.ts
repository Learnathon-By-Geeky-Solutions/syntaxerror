import express from "express";
import upload from "../../utils/multer";
import { CategoryController } from "./category.controller";
const router = express.Router();

router.post("/", upload.single("image"), CategoryController.addCategory);

export const CategoryRoutes = router;