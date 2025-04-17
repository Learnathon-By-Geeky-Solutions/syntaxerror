import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Leaf, ShieldCheck, Sprout, Truck, Users } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Bridging Farmers and Consumers</h1>
          <p className="text-base md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            iKrishak is revolutionizing the agricultural marketplace by connecting farmers directly with consumers, ensuring fresh produce and fair prices for all.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700"><Link href="/">Continue</Link></Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              To create a sustainable ecosystem where farmers prosper and consumers access fresh, quality produce at reasonable prices through technology-driven solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <Card>
              <CardHeader>
                <HeartHandshake className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Fair Trade</CardTitle>
                <CardDescription>Supporting farmers with better prices and direct market access</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Leaf className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Fresh Produce</CardTitle>
                <CardDescription>Ensuring quality and freshness from farm to table</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Community First</CardTitle>
                <CardDescription>Building lasting relationships between farmers and consumers</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose iKrishak?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <ShieldCheck className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg md:text-xl mb-2">Secure Transactions</h3>
                <p className="text-gray-600 text-sm">Multiple payment options with secure payment gateways and cash on delivery.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Truck className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg md:text-xl mb-2">Reliable Delivery</h3>
                <p className="text-gray-600 text-sm">Track your orders in real-time with our efficient delivery system.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Sprout className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg md:text-xl mb-2">Quality Assurance</h3>
                <p className="text-gray-600 text-sm">Rigorous quality checks to ensure the best produce reaches you.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Users className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg md:text-xl mb-2">Customer Support</h3>
                <p className="text-gray-600 text-sm">Dedicated support team to assist both farmers and consumers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-green-600 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-gray-100">Farmers Connected</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50000+</div>
              <div className="text-gray-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-gray-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Agricultural Revolution</h2>
          <p className="text-gray-600 mb-8">
            Whether you are a farmer looking to expand your reach or a consumer seeking fresh produce, iKrishak is here to serve you.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg"><Link href="/product">Shop Now</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
