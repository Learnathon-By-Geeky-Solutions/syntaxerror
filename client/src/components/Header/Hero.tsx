"use client";

import { Button } from "@/components/ui/button";
import { Clock, Leaf, ShoppingBasket, Truck } from "lucide-react";

export default function Hero() {
  return (
    <main>
      <div className="relative min-h-screen lg:min-h-[800px] flex items-center pt-6 md:px-4">
        {/* Background with overlay gradient */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 bg-green-600/20 text-green-400 px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">100% Organic Produce</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Fresh & Healthy Groceries
              <span className="block text-green-600">Delivered Daily</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl">
              Experience the convenience of having farm-fresh produce and premium groceries delivered right to your doorstep. Quality you can trust, service you can rely on.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <ShoppingBasket className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600/10 hover:text-white">
                View Categories
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { 
                  icon: <Leaf className="w-6 h-6 text-green-600" />,
                  title: "Fresh & Organic",
                  desc: "100% organic certified produce"
                },
                {
                  icon: <Truck className="w-6 h-6 text-green-600" />,
                  title: "Free Delivery",
                  desc: "On orders above $50"
                },
                {
                  icon: <Clock className="w-6 h-6 text-green-600" />,
                  title: "Express Delivery",
                  desc: "Same day delivery available"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-green-600/50 transition-colors">
                  {feature.icon}
                  <h3 className="font-semibold text-lg mt-4 mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}