"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowLeft,
  Leaf,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page({
  params,
}: {
  params: Promise<{ productid: string }>;
}) {
  const { productid } = use(params);
  const [categoryName, setCategoryName] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user } = useUser();
  console.log(category);

  useEffect(() => {
    if (category) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${category}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data) {
            setCategoryName(data.data.name);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [category]);

  useEffect(() => {
    const fetchUserReview = async () => {
      if (!user?.email) return;

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/review/${user.email}?productId=${productid}`
        );

        if (data && data.data) {
          setRating(data.data[0]?.rating || 0);
        }
      } catch (error) {
        console.error("Failed to fetch user review:", error);
      }
    };

    fetchUserReview();
  }, [user?.email, productid]);

  const fetchProduct = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${productid}`
    );
    return data.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["latestProduct"],
    queryFn: fetchProduct,
  });

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/review?email=${user.email}`,
        {
          productId: productid,
          rating,
        }
      );
      toast.success("Review submitted successfully");

      // Refetch the review to update the UI
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/review/${user.email}?productId=${productid}`
      );
      if (data && data.data) {
        setRating(data.data[0]?.rating || 0);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-52"></div>
          <div className="h-10 bg-gray-200 rounded w-96"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <p className="text-red-500">Error: {error.message}</p>
          <Link
            href="/"
            className="text-green-600 hover:underline mt-4 inline-block"
          >
            Return to Home
          </Link>
        </Card>
      </div>
    );
  }

  const discountedPrice = data.price - (data.price * data.discount) / 100;
  const fadeInAnimation = !isImageLoaded
    ? "opacity-0"
    : "opacity-100 transition-opacity duration-500";

  const handleAddToCart = () => {
    try {
      addItem({
        productId: data._id,
        title: data.title,
        image: data.image,
        price:
          data.discount > 0
            ? data.price - data.price * (data.discount / 100)
            : data.price,
        quantity: quantity,
        stock: data.stock,
      });
      toast.success("Added to cart successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg:py-8">
        {/* Back Navigation */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back
          </Link>
          {categoryName && (
            <p className="mt-2 text-sm text-gray-500">
              Category:{" "}
              <span className="font-medium text-gray-900">{categoryName}</span>
            </p>
          )}
        </div>

        <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
            {/* Product Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  onLoad={() => setIsImageLoaded(true)}
                  className={`object-contain p-3 ${fadeInAnimation}`}
                />
                {data.discount > 0 && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    {data.discount}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:py-20 flex flex-col justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  {data.title}
                </h1>
                <div className="flex items-center gap-3 mb-3">
                  {data.discount > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-green-600">
                        ৳{discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-base text-gray-400 line-through">
                        ৳{data.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-green-600">
                      ৳{data.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {data.description}
                </p>
                <Separator className="my-6" />
              </div>

              {/* Review Section */}
              <div className="mt-8 py-4 bg-white/50 backdrop-blur-sm rounded-lg">
              <p className="text-sm my-2 font-light">Your rating</p>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {rating ? `${rating} out of 5 stars` : "Select rating"}
                  </span>
                </div>
                <Button
                  onClick={handleSubmitReview}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  Submit Review
                </Button>
              </div>

              <div className="flex flex-col">
                {/* Features - Desktop View */}
                <div className="">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                      <div className="flex items-start gap-3">
                        <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            Fresh Guarantee
                          </h3>
                          <p className="text-xs text-gray-600">
                            Full refund within 24h if not satisfied
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-sky-50">
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            Stock Status
                          </h3>
                          <p className="text-xs text-gray-600">
                            {data.stock > 0 ? (
                              <span className="text-green-600">
                                {data.stock} available
                              </span>
                            ) : (
                              <span className="text-red-500">Out of Stock</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center border rounded-lg px-2 w-full bg-white">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="mx-2 w-full text-center">{quantity}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      disabled={quantity >= data.stock}
                      onClick={() =>
                        setQuantity((q) => Math.min(data.stock, q + 1))
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    size="sm"
                    disabled={data.stock === 0}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1.5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
