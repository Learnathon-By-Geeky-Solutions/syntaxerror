"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { TProduct } from "@/types/types";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface ProductCardProps {
  product: TProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    try {
      addItem({
        productId: product._id,
        title: product.title,
        image: product.image,
        price: product.discount > 0 
          ? product.price - (product.price * (product.discount / 100))
          : product.price,
        quantity: 1,
        stock: product.stock
      });
      toast.success('Added to cart successfully');
    } catch (error) {
      console.log(error)
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div>
      <Card
        key={product._id}
        className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-emerald-600/20 overflow-hidden animate-fade-in"
        style={{ animationDelay: `${0.2}s` }}
      >
        <CardContent className="p-0">
          <div className="relative">
            <Link href={`/product/${product._id}?category=${product.category}`}>
              <Image
                src={product.image}
                alt={product.title}
                width={250}
                height={250}
                className="mx-auto aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            {product.discount > 0 && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-rose-500 text-white border-0 text-xs px-2 py-0.5">
                  -{product.discount}%
                </Badge>
              </div>
            )}

            {product.stock > 0 ? (
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-600 text-white border-0 text-xs px-2 py-0.5">
                  In Stock
                </Badge>
              </div>
            ) : (
              <div className="absolute top-2 left-2">
                <Badge className="bg-rose-500 text-white border-0 text-xs px-2 py-0.5">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <div className="p-2.5 md:p-3 flex flex-col h-[calc(100%-100%)]">
            <div className="flex items-center gap-0.5 mb-1.5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-3 h-3 md:w-3.5 md:h-3.5 ${
                    index < Math.floor(5)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({5})</span>
            </div>

            <h3 className="font-medium text-sm text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 mb-1 line-clamp-2 min-h-[2rem]">
              {product.title}
            </h3>

            <div>
              {product.discount > 0 ? (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-bold text-emerald-600">
                    BDT
                    {(
                      product.price -
                      product.price * (product.discount / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    BDT{product.price}
                  </span>
                </div>
              ) : (
                <span className="text-base font-bold text-emerald-600">
                  BDT{product.price}
                </span>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className="w-full mt-1 bg-emerald-600 hover:bg-emerald-700 text-white group-hover:shadow-md transition-all duration-300 h-7 md:h-8 text-xs"
            >
              <ShoppingCart className="w-3 h-3 mr-1.5" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}