"use client";
import ProductCard from "@/components/product/productCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Package } from "lucide-react";

export default function page () {
  const fetchProduct = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/product"
    );
    return data.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["latestProduct"],
    queryFn: fetchProduct,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <section className="py-8 md:px-4 md:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <Package className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              All Products
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
        {data.map((product: any, index: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

