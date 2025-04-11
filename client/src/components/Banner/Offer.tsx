
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Offer = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 mb-8">
      <div className="bg-gradient-to-r from-[#F2FCE2] to-[#EAFFD6] rounded-2xl overflow-hidden shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium inline-block mb-4 w-fit">Limited Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Special Offer</h2>
            <p className="text-gray-600 mb-6">
              Get upto 30% off on all fresh fruits and vegetables
            </p>
            <Button className="w-fit"><Link href="/product">Shop Now</Link></Button>
          </div>
          <div className="w-full md:w-1/2 min-h-[200px] md:min-h-[300px] relative">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;