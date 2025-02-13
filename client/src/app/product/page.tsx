"use client";
import ProductCard from "@/components/product/productCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Package } from "lucide-react";
import { TProduct } from "../../types/types";

export default function Page () {
  const fetchProduct = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
    );
    return data.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["Product"],
    queryFn: fetchProduct,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


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
        {data.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};









// "use client";
// import ProductCard from "@/components/product/productCard";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { ArrowUpDown, Package } from "lucide-react";
// import { useState } from "react";
// import { TProduct } from "../types/types";

// export default function Page() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState("newest");
//   const productsPerPage = 15;

//   const fetchProduct = async () => {
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
//     );
//     return data.data;
//   };

//   const { data: rawData, error, isLoading } = useQuery({
//     queryKey: ["Product"],
//     queryFn: fetchProduct,
//   });

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
//     </div>
//   );
  
//   if (error) return (
//     <div className="text-center text-red-500 py-8">
//       Error: {error.message}
//     </div>
//   );

//   // Sort products based on selected option
//   const sortProducts = (products: TProduct[]) => {
//     const sortedProducts = [...products];
//     switch (sortBy) {
//       case "highToLow":
//         return sortedProducts.sort((a, b) => b.price - a.price);
//       case "lowToHigh":
//         return sortedProducts.sort((a, b) => a.price - b.price);
//       case "newest":
        
//       default:
//         return sortedProducts;
//     }
//   };

//   // Calculate pagination
//   const sortedData = sortProducts(rawData);
//   const totalPages = Math.ceil(sortedData.length / productsPerPage);
//   const startIndex = (currentPage - 1) * productsPerPage;
//   const paginatedData = sortedData.slice(startIndex, startIndex + productsPerPage);

//   // Generate page numbers for pagination
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <section className="py-8 md:px-4 md:py-12 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-full mx-auto px-4 sm:px-6">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
//           <div className="flex items-center gap-2 md:gap-3">
//             <Package className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
//               All Products
//             </h2>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <ArrowUpDown className="w-4 h-4 text-gray-500" />
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="newest">Newest First</SelectItem>
//                 <SelectItem value="highToLow">Price: High to Low</SelectItem>
//                 <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
//           {paginatedData.map((product: TProduct) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-2 mt-8">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
//           >
//             Previous
//           </button>
          
//           {pageNumbers.map(number => (
//             <button
//               key={number}
//               onClick={() => setCurrentPage(number)}
//               className={`px-3 py-1 rounded border ${
//                 currentPage === number
//                   ? "bg-emerald-600 text-white border-emerald-600"
//                   : "border-gray-300 hover:bg-gray-50"
//               }`}
//             >
//               {number}
//             </button>
//           ))}
          
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }