"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, Clock, Heart, Leaf, Package, Scale, ShoppingCart } from "lucide-react";
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
  const category = searchParams.get('category');
  const { addItem } = useCart();
  console.log(category);

  useEffect(() => {
    if (category) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${category}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.data) {
            setCategoryName(data.data.name);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [category]);

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
          <Link href="/" className="text-green-600 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </Card>
      </div>
    );
  }

  const discountedPrice = data.price - (data.price * data.discount) / 100;
  const fadeInAnimation = !isImageLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-500";

  const handleAddToCart = () => {
    try {
      addItem({
        productId: data._id,
        title: data.title,
        image: data.image,
        price: data.discount > 0 
          ? data.price - (data.price * (data.discount / 100))
          : data.price,
        quantity: 1,
        stock: data.stock
      });
      toast.success('Added to cart successfully');
    } catch (error) {
      console.log(error)
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 group w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Products
          </Link>
          {categoryName && (
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">Category</span>
              <h2 className="text-xl font-medium text-gray-900">{categoryName}</h2>
            </div>
          )}
        </div>

        <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg ring-1 ring-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  onLoad={() => setIsImageLoaded(true)}
                  className={`object-contain p-4 ${fadeInAnimation}`}
                />
                {data.discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-green-600/90 backdrop-blur-sm shadow-sm">
                    {data.discount}% OFF
                  </Badge>
                )}
              </div>

              <div className="lg:hidden space-y-4">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{data.title}</h1>
                  <div className="flex items-center gap-3">
                    {data.discount > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-green-600">৳{discountedPrice.toFixed(2)}</span>
                        <span className="text-lg text-gray-400 line-through">৳{data.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-green-600">৳{data.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{data.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
                  <Scale className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Fresh Produce</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Same Day Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="hidden lg:block space-y-4">
                <h1 className="text-3xl xl:text-4xl font-semibold text-gray-900">{data.title}</h1>
                <div className="flex items-center gap-4">
                  {data.discount > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-green-600">৳{discountedPrice.toFixed(2)}</span>
                      <span className="text-xl text-gray-400 line-through">৳{data.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-green-600">৳{data.price.toFixed(2)}</span>
                  )}
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{data.description}</p>
              </div>

              <Separator className="hidden lg:block" />

              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <Leaf className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">100% Fresh Guarantee</h3>
                      <p className="text-sm text-gray-600">
                        Not satisfied with the freshness? Get a full refund within 24 hours of delivery.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <Package className="w-5 h-5 text-green-600" />
                  <span className="font-medium">
                    {data.stock > 0 ? (
                      <span className="text-green-600">{data.stock} units available</span>
                    ) : (
                      <span className="text-red-500">Out of Stock</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200"
                  disabled={data.stock === 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}