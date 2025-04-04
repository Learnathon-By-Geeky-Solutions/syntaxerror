"use client";
import { Card } from "@/components/ui/card";
import { Grid2X2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function Category() {
  const router = useRouter();
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleImageError = (categoryId: string) => {
    setImageError((prev) => ({ ...prev, [categoryId]: true }));
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/product?category=${categoryName}`);
  };

  return (
    <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Grid2X2 className="w-7 h-7 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              All Categories ({categories.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Card
              key={category._id}
              className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative w-full pt-[100%]">
                {!imageError[category._id] && category.image ? (
                  <div className="absolute inset-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16.67vw"
                      className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(category._id)}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white/90">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-4">
                  <h3 className="text-sm font-medium text-white text-center px-2 truncate">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
