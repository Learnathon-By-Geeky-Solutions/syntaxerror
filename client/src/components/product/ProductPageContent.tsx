"use client";
import FilterSelect from "@/components/product/FilterSelect";
import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/productCard";
import { TProduct } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader, Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const sortOptions = [
  { label: "Price: Low to High", value: "price_low_to_high" },
  { label: "Price: High to Low", value: "price_high_to_low" },
];

const limitOptions = [
  { label: "20 per page", value: "20" },
  { label: "30 per page", value: "30" },
  { label: "50 per page", value: "50" },
  { label: "100 per page", value: "100" },
];

export default function ProductPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("20");
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    // Reset page when search changes
    setPage(1);

    router.push(`/product?${params.toString()}`);
  }, [selectedCategory, searchQuery, router, searchParams]);

  // Fetch products
  const fetchProducts = async () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit,
      ...(sortBy && { sortBy }),
      ...(selectedCategory !== "all" && { categoryName: selectedCategory }),
      ...(searchQuery && { search: searchQuery }),
    });

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product?${params.toString()}`
    );
    return data;
  };

  // Fetch categories
  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`
    );
    return data.data;
  };

  // Update query key to include searchQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, limit, sortBy, selectedCategory, searchQuery],
    queryFn: fetchProducts,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading || categoriesLoading)
    return (
      <section className="py-6 px-4 md:px-8 md:py-20">
        <div className="mx-auto flex justify-center items-center h-full">
          <Loader className="animate-spin text-green-600" size={40} />
        </div>
      </section>
    );
  if (error || categoriesError)
    return <p>Error: {(error || categoriesError)?.message}</p>;

  const products = data?.data || [];
  const pagination = data?.pagination || {};
  const categories = categoriesData || [];

  // Update the page title to show search results
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : "All Products"}
                </h1>
              </div>

              {/* Filters */}
              <div className="flex flex-col items-center md:flex-row justify-center md:justify-between gap-4 bg-[#1f2937] py-3 px-3 rounded-lg">
                <div>
                  <FilterSelect
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    options={[
                      { label: "All Categories", value: "all" },
                      ...categories.map(
                        (category: {
                          _id: string;
                          name: string;
                          image: string;
                        }) => ({
                          label: category.name,
                          value: category.name,
                        })
                      ),
                    ]}
                    placeholder="Select category"
                  />
                </div>
                <div className="flex justify-between md:justify-end gap-4">
                  <FilterSelect
                    value={sortBy}
                    onValueChange={setSortBy}
                    options={sortOptions}
                    placeholder="Sort by"
                  />
                  <FilterSelect
                    value={limit}
                    onValueChange={setLimit}
                    options={limitOptions}
                    placeholder="Items per page"
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 mb-8">
              {products.map((product: TProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-[#1f2937] py-3 px-3 rounded-lg">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
