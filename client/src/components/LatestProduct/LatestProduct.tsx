import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ShoppingCart, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  rating: number;
  discount?: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Organic Apples",
    price: 4.99,
    originalPrice: 6.99,
    image: "/placeholder.svg",
    rating: 4.5,
    discount: 28,
  },
  {
    id: 2,
    name: "Premium Bananas",
    price: 3.49,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Organic Carrots",
    price: 2.99,
    originalPrice: 3.99,
    image: "/placeholder.svg",
    rating: 4.3,
    discount: 25,
  },
  {
    id: 4,
    name: "Fresh Tomatoes",
    price: 3.99,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Organic Spinach",
    price: 2.49,
    originalPrice: 3.49,
    image: "/placeholder.svg",
    rating: 4.6,
    discount: 29,
  },
  {
    id: 6,
    name: "Fresh Avocados",
    price: 5.99,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Sweet Oranges",
    price: 3.99,
    originalPrice: 5.99,
    image: "/placeholder.svg",
    rating: 4.4,
    discount: 33,
  },
  {
    id: 8,
    name: "Fresh Strawberries",
    price: 4.49,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.8,
  },
  {
    id: 9,
    name: "Organic Potatoes",
    price: 2.99,
    originalPrice: 4.99,
    image: "/placeholder.svg",
    rating: 4.5,
    discount: 40,
  },
  {
    id: 10,
    name: "Fresh Broccoli",
    price: 2.49,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.6,
  },
];

const LatestProducts = () => {
  return (
    <section className="py-8 md:px-4 md:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <Package className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Latest Products
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {products.map((product, index) => (
            <Card 
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-emerald-600/20 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-rose-500 text-white border-0 text-xs px-2 py-0.5">
                        -{product.discount}%
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
                          index < Math.floor(product.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.rating})
                    </span>
                  </div>
                  
                  <h3 className="font-medium text-sm text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 mb-1 line-clamp-2 min-h-[2rem]">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base font-bold text-emerald-600">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white group-hover:shadow-md transition-all duration-300 h-7 md:h-8 text-xs mt-auto"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1.5" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;