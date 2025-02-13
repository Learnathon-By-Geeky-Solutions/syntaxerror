import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { UserModel } from "../user/user.model";
import { CartService } from "./cart.service";

const addToCart = catchAsync(async (req: Request, res: Response) => {
    const userEmail = req.user?.email;
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
         res.status(400).json({
            success: false,
            message: "User not found",
        });
    }

  const consumerId = new mongoose.Types.ObjectId(user?._id);
  const { productId, quantity } = req.body;

  if (!consumerId || !productId || !quantity) {
    res.status(400).json({
      success: false,
      message: "consumerId, productId, and quantity are required",
    });
  }

  const result = await CartService.addToCart(consumerId, productId, quantity);

  res.status(201).json({
    success: true,
    message: "Product added to cart successfully",
    data: result,
  });
});


const getCart = catchAsync(async (req: Request, res: Response) => {
    const userEmail = req.user?.email;
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
         res.status(400).json({
            success: false,
            message: "User not found",
        });
    }

    const consumerId = new mongoose.Types.ObjectId(user?._id);

    if (!consumerId) {
         res.status(400).json({
            success: false,
            message: "consumerId is required",
        });
    }

    const result = await CartService.getCart(consumerId);

    res.status(200).json({
        success: true,
        message: "Cart retrieved successfully",
        data: result,
    });
});


  const removeProductFromCart = catchAsync(async (req: Request, res: Response) => {
    const userEmail = req.user?.email;
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
         res.status(400).json({
            success: false,
            message: "User not found",
        });
    }

  const consumerId = new mongoose.Types.ObjectId(user?._id);
    const { productId } = req.params;
  
    if (!consumerId || !productId) {
       res.status(400).json({
        success: false,
        message: "consumerId and productId are required",
      });
    }
  
    const result = await CartService.removeProductFromCart(consumerId, productId);
  
    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      data: result,
    });
  });
  
  const clearCart = catchAsync(async (req: Request, res: Response) => {
    const userEmail = req.user?.email;
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
         res.status(400).json({
            success: false,
            message: "User not found",
        });
    }

  const consumerId = new mongoose.Types.ObjectId(user?._id);
  
    if (!consumerId) {
       res.status(400).json({
        success: false,
        message: "consumerId is required",
      });
    }
  
    const result = await CartService.clearCart(consumerId);
  
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: result,
    });
  });



  const updateCartQuantity = catchAsync(async (req: Request, res: Response) => {
    const { consumerId, productId, quantity } = req.body;
  
    if (!consumerId || !productId || !quantity) {
       res.status(400).json({
        success: false,
        message: "consumerId, productId, and quantity are required",
      });
    }
  
    const result = await CartService.updateCartQuantity(consumerId, productId, quantity);
  
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: result,
    });
  });

export const CartController = {
    addToCart,
    getCart,
    removeProductFromCart,
    clearCart,
    updateCartQuantity
}