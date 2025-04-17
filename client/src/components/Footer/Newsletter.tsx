import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for subscribing! 🌱");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 my-6">
      <div className="bg-gray-100 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6 max-w-xs md:max-w-xl mx-auto">
          Stay updated with our latest offers, new products, and healthy recipe
          ideas.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-gray-800"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
}
