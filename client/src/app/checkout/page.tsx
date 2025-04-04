"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/UserContext";
import { CreditCard, Package, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

const Checkout = () => {
  const [ordersData, setOrdersData] = useState<OrderItem[]>([]);
  const {user} = useUser();

  // Load orders from localStorage
  useEffect(() => {
    const orders = localStorage.getItem("shopping-cart");
    if (orders) {
      try {
        const parsedOrders: OrderItem[] = JSON.parse(orders);
        setOrdersData(parsedOrders);
      } catch (error) {
        console.error("Failed to parse shopping cart data:", error);
      }
    }
  }, []);

  const total = ordersData.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Function to handle placing order
  const handlePlaceOrder = async () => {
    const customerInfo = {
      fullName: (document.getElementById("fullName") as HTMLInputElement)?.value,
      contact: (document.getElementById("contact") as HTMLInputElement)?.value,
      email: (document.getElementById("email") as HTMLInputElement)?.value,
      address: (document.getElementById("address") as HTMLTextAreaElement)?.value,
      note: (document.getElementById("additionalInfo") as HTMLTextAreaElement)?.value,
    };

    // Validate required fields
    if (!customerInfo.fullName || !customerInfo.contact || !customerInfo.email || !customerInfo.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.loading("Initializing secure payment...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orders: ordersData,
          customerInfo,
        }),
      });

      const data = await res.json();
      toast.dismiss();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe payment page
      } else {
        toast.error("Payment initialization failed");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Payment service unavailable");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Section: Delivery Information */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Truck className="h-5 w-5 text-green-600" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input id="contact" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input disabled defaultValue={user?.email} id="email" type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea id="address" placeholder="123 Apple Street, Cupertino, CA 95014" />
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Info (Optional)</Label>
                  <Textarea id="additionalInfo" placeholder="E.g. landmark, delivery time, etc." />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  Secure Payment
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Your transaction is secured with SSL encryption
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-full">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Stripe Secure Checkout</h3>
                      <p className="text-sm text-gray-500">
                        You&apos;ll be redirected to Stripe&apos;s secure payment page
                      </p>
                    </div>
                  </div>
                  <Image 
                    src="https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo-700x394.png" 
                    alt="Stripe Secure" 
                    width={50} 
                    height={20}
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section: Order Summary */}
          <Card className="shadow-md sticky top-6 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="h-5 w-5 text-green-600" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {ordersData.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-4">
                    <Image height={30} width={30} src={item.image} alt={item.title} className="object-cover rounded-md" />
                    <div className="flex-1">
                      <p className="">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md">
                Your payment is secure and encrypted.
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                size="lg"
              >
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
