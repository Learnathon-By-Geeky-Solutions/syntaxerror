import express from "express";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.put("/", ReviewController.upsertReview);
router.get("/", ReviewController.getAllReviews);
router.get("/:email", ReviewController.getReviewsByEmail);
router.get("/rating/:productId", ReviewController.getProductRating);

export const ReviewRoutes = router;