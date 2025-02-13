"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Grid2X2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const Categories = () => {
  const [showAll, setShowAll] = useState(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  const handleImageError = (categoryId: string) => {
    setImageError((prev) => ({ ...prev, [categoryId]: true }));
  };

  return (
    <section className="w-full px-4 py-12 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Grid2X2 className="w-7 h-7 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {displayedCategories.map((category) => (
            <Card
              key={category._id}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-600/20 hover:-translate-y-1"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-16 h-16 overflow-hidden rounded-full bg-green-50 group-hover:bg-green-600/10 transition-colors duration-300">
                  {!imageError[category._id] && category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={64}
                      height={64}
                      layout="responsive"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(category._id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-600">
                      {category.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {categories.length > 6 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="group border-2 hover:border-green-600 hover:bg-green-600/5 transition-all duration-300"
            >
              <span className="mr-2 text-gray-700 group-hover:text-green-600">
                {showAll ? "Show Less" : "See More Categories"}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-green-600 group-hover:transform group-hover:-translate-y-1 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-4 h-4 text-green-600 group-hover:transform group-hover:translate-y-1 transition-transform duration-300" />
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;