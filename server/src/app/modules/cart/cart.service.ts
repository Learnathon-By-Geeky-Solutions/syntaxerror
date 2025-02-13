import { Types } from "mongoose";
import { ProductModel } from "../product/product.model";
import { CartModel } from "./cart.model";

const addToCart = async (
  consumerId: Types.ObjectId,
  productId: string,
  quantity: number
) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  const availableStock = product.stock ?? 0;
  if (quantity > availableStock) {
    throw new Error(`Only ${product.stock} items available in stock`);
  }
  const price = product.price;
  let cart = await CartModel.findOne({ consumerId });
  if (!cart) {
    cart = new CartModel({ consumerId, products: [] });
  }
  const productIndex = cart.products.findIndex((p) =>
    p.productId.equals(productId)
  );
  if (productIndex !== -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({
      productId: new Types.ObjectId(productId),
      quantity,
      price,
    });
  }
  product.stock = availableStock - quantity;;
  await product.save();
  await cart.save();
  return cart;
};

const getCart = async (consumerId: Types.ObjectId) => {
  const cart = await CartModel.findOne({ consumerId })
    .populate({
      path: "products.productId",
      select: "title image",
    })
    .lean();

  return cart;
};

const removeProductFromCart = async (consumerId: Types.ObjectId, productId: string) => {
  const cart = await CartModel.findOne({ consumerId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.products = cart.products.filter((p) => !p.productId.equals(productId));

  await cart.save();
  return cart;
};

const clearCart = async (consumerId: Types.ObjectId) => {
  const cart = await CartModel.findOne({ consumerId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.products = [];
  await cart.save();

  return cart;
};


const updateCartQuantity = async (consumerId: string, productId: string, quantity: number) => {
    const cart = await CartModel.findOne({ consumerId });
  
    if (!cart) {
      throw new Error("Cart not found");
    }
  
    const productIndex = cart.products.findIndex((p) => p.productId.equals(productId));
  
    if (productIndex === -1) {
      throw new Error("Product not in cart");
    }
  
    // Ensure the quantity doesn't exceed stock
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const availableStock = product.stock ?? 0;
  
    if (quantity > availableStock) {
      throw new Error(`Only ${availableStock} items available in stock`);
    }
  
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    return cart;
  };
  

export const CartService = {
  addToCart,
  getCart,
  removeProductFromCart,
  clearCart,
  updateCartQuantity
};
