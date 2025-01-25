"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Grid2X2 } from "lucide-react";
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 1, name: "Fruits & Vegetables", icon: "🥬" },
  { id: 2, name: "Meat & Fish", icon: "🥩" },
  { id: 3, name: "Dairy & Eggs", icon: "🥛" },
  { id: 4, name: "Bakery", icon: "🥖" },
  { id: 5, name: "Beverages", icon: "🥤" },
  { id: 6, name: "Snacks", icon: "🍿" },
  { id: 7, name: "Household", icon: "🧹" },
  { id: 8, name: "Personal Care", icon: "🧴" },
  { id: 9, name: "Frozen Foods", icon: "🧊" },
  { id: 10, name: "Pantry", icon: "🥫" },
];

const Categories = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedCategories = showAll ? categories : categories.slice(0, 6);

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
              key={category.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-600/20 hover:-translate-y-1"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 group-hover:bg-green-600/10 transition-colors duration-300">
                  <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
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
                {showAll ? 'Show Less' : 'See More Categories'}
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