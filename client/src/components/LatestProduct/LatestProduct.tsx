"use client";
import { TProduct } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, Loader, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCard from "../product/productCard";
import { Button } from "../ui/button";

const LatestProducts = () => {
  const router = useRouter();
  const fetchLatestProduct = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/latest/product`
    );
    return data.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["latestProduct"],
    queryFn: fetchLatestProduct,
  });
  if (isLoading) return (
    <section className="py-6 px-4 md:px-8 md:py-8">
      <div className="mx-auto flex justify-center items-center h-full">
        <Loader className="animate-spin text-green-600" size={40} />
      </div>
    </section>
  );
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <section className="container mx-auto py-6 px-4 md:px-8 md:py-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <div className="flex items-center gap-1 md:gap-2">
            <Package className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Latest Products
            </h2>
          </div>
          <Button
            variant="link"
            className="text-xs flex items-center gap-1"
            onClick={() => router.push("/product")}
          >
            View All <ArrowRight className="h-2 w-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {data.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
