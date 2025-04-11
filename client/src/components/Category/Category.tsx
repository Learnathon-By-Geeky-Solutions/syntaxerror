"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid2X2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const PopularCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const displayedCategories = categories.slice(0, 6); 

  const handleImageError = (categoryId: string) => {
    setImageError((prev) => ({ ...prev, [categoryId]: true }));
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/product?category=${categoryName}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 mb-6">
      <div className="flex justify-between items-center mb-2 md:mb-4">
        <div className="flex items-center gap-1 md:gap-2">
        <Grid2X2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Popular Categories</h2>
        </div>
        <Button
          variant="link"
          className="text-xs flex items-center gap-1"
          onClick={() => router.push("/category")}
        >
          View All <ArrowRight className="h-2 w-2" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayedCategories.map((category, i) => (
          <div
            key={category._id}
            className="group relative rounded-xl overflow-hidden h-32 cursor-pointer shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: imageError[category._id]
                  ? "url('/fallback-image.jpg')"
                  : `url(${category.image})`,
              }}
              onError={() => handleImageError(category._id)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 group-hover:from-black/80 transition-all" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-medium text-base">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;