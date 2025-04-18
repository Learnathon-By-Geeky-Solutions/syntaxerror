import { Types } from "mongoose";
import { UserModel } from "../user/user.model";
import { ReviewModel } from "./review.model";

const upsertReview = async (
  email: string,
  payload: { productId: string; rating: number }
) => {
  // Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Check if user has already reviewed this product
  const existingReview = await ReviewModel.findOne({
    userId: user._id,
    productId: payload.productId,
  });

  if (existingReview) {
    // Update existing review
    const updatedReview = await ReviewModel.findOneAndUpdate(
      {
        userId: user._id,
        productId: payload.productId,
      },
      { rating: payload.rating },
      { new: true }
    ).populate("userId", "name email image");

    return {
      review: updatedReview,
      message: "Review updated successfully",
    };
  }

  // Create new review
  const newReview = await ReviewModel.create({
    userId: user._id,
    productId: new Types.ObjectId(payload.productId),
    rating: payload.rating,
  });

  const populatedReview = await newReview.populate("userId", "name email image");

  return {
    review: populatedReview,
    message: "Review added successfully",
  };
};

const getAllReviews = async () => {
  const reviews = await ReviewModel.find()
    .populate("userId", "name email image")
    .populate("productId", "title price image")
    .sort({ createdAt: -1 });

  return reviews;
};

const getReviewsByEmail = async (email: string, productId:string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const reviews = await ReviewModel.find({ userId: user._id, productId: productId });

  return reviews;
};

const getReviewsByProduct = async (productId: string) => {
  const reviews = await ReviewModel.find({ productId })
    .populate("userId", "name email image")
    .sort({ createdAt: -1 });

  return reviews;
};

const getProductRating = async (productId: string) => {
  const result = await ReviewModel.aggregate([
    { $match: { productId: new Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      }
    }
  ]);

  if (result.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
    };
  }

  return {
    averageRating: Number(result[0].averageRating.toFixed(1)),
    totalReviews: result[0].totalReviews,
  };
};

export const ReviewService = {
  upsertReview,
  getAllReviews,
  getReviewsByEmail,
  getReviewsByProduct,
  getProductRating
};