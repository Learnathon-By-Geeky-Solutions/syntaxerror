"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import useCart from "@/hooks/use-Cart";
import { TProductCart } from "@/types/types";
import axios from "axios";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";



interface CartProps {
  cartItems: TProductCart[] | null | undefined;
}

export default function Cart({ cartItems }: CartProps) {
  const validCartItems = Array.isArray(cartItems) ? cartItems : [];

  const subtotal: number = validCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total: number = subtotal;
  const { cartItems:cartData, refetch} = useCart();

  const handleDeleteProduct = async (productId:string)=>{
    try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/remove/${productId}`,
          {
            withCredentials: true, 
          }
        );
    
        console.log("Added to cart:", response.data);
    
        if (response.data.success) {
          refetch();
          console.log(cartData)
          toast.success('Product deleted from cart successfully')
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error(`Something went wrong! Please try again.`);
    
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Failed to add product to cart.");
        } else {
            toast.error("An unexpected error occurred.");
        }
      }
  }

  const handleClearCart = async () => {
    try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/clear`,
          {
            withCredentials: true, 
          }
        );    
        if (response.data.success) {
          refetch();
          toast.success("Cart successfully cleared")
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error(`Something went wrong! Please try again.`);
      }
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <ShoppingCart size={24} />
            {validCartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                {validCartItems.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader className="space-y-2.5 pb-6">
            <SheetTitle className="text-2xl">Shopping Cart</SheetTitle>
            <SheetDescription className="text-base">
              {validCartItems.length === 0
                ? "Your cart is empty"
                : `You have ${validCartItems.length} item${
                    validCartItems.length > 1 ? "s" : ""
                  } in your cart`}
            </SheetDescription>
          </SheetHeader>

          {validCartItems.length > 0 ? (
            <>
              <ScrollArea className="flex-1 h-[50vh] -mx-6 px-6">
                <div className="space-y-6">
                  {validCartItems.map((item) => (
                    <div key={item.productId._id} className="flex items-center space-x-4">
                      <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={item.productId.image}
                          alt={item.productId.title}
                          fill
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium leading-none">
                          {item.productId.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          BDT{item.price.toFixed(2)}
                        </span>
                        <div className="mt-2 flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              // Handle decrease quantity
                            }}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              // Handle increase quantity
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteProduct(item.productId._id)} 
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="space-y-4 pt-6">
                <Separator />
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm font-medium">
                      BDT{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>BDT{total.toFixed(2)}</span>
                  </div>
                </div>
                <Button onClick={handleClearCart} variant={"destructive"} className="w-full">
                <Trash2 className="h-4 w-4" />
                  Clear Cart
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Checkout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-[450px] flex-col items-center justify-center space-y-4">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
              <div className="text-center space-y-2">
                <div className="text-xl font-medium">Your cart is empty</div>
                <div className="text-sm text-gray-500">
                  Add items to your cart to proceed with checkout
                </div>
              </div>
              <SheetClose asChild>
                <Button variant="outline" className="mt-4">
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
