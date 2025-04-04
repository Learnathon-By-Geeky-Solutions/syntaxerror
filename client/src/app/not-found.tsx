"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, ShoppingBasket } from "lucide-react";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 pt-10 md:pt-2">
        {/* Icon */}
        <div className="relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 transform">
            <ShoppingBasket className="h-24 w-24 text-green-500 animate-bounce" />
          </div>
          <h1 className="text-9xl font-bold text-green-600 opacity-10">404</h1>
        </div>

        {/* Content */}
        <div className="space-y-4 mt-8">

          <h2 className="text-3xl font-bold text-gray-900">Oops! Page Not Found</h2>
          <p className="text-gray-600 text-lg">
            Looks like this aisle is empty! We couldn&apos;t find the fresh produce you&apos;re looking for.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            variant="outline"
            className="gap-2"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          
          <Button
            className="bg-green-600 hover:bg-green-700 gap-2"
            asChild
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Need help finding something?</p>
          <Link 
            href="/contact" 
            className="text-green-600 hover:text-green-700 underline decoration-dashed underline-offset-4"
          >
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
}