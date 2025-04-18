import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ReviewService } from "./review.service";

const upsertReview = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const payload = req.body;
  const { review, message } = await ReviewService.upsertReview(email as string, payload);
  
  res.status(200).json({
    success: true,
    message,
    data: review,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReviews();
  
  res.status(200).json({
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const getReviewsByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const { productId } = req.query;
  const result = await ReviewService.getReviewsByEmail(email,productId as string);
  
  res.status(200).json({
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const getProductRating = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
  
    const result = await ReviewService.getProductRating(productId);
  
    res.status(200).json({
      success: true,
      message: "Product rating retrieved successfully",
      data: result,
    });
  });
  
export const ReviewController = {
  upsertReview,
  getAllReviews,
  getReviewsByEmail,
  getProductRating
};