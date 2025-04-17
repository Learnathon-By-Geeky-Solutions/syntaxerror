"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/UserContext";
import { Order } from "@/types/types";
import axios from "axios";
import { format } from "date-fns";
import {
  Calendar,
  Heart,
  Lock,
  Mail,
  ShoppingBag,
  User,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/order?email=${user?.email}`
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full h-48 bg-gradient-to-r from-primary/10 to-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="flex flex-col gap-6">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="my-12 py-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200">
              Please sign in to view your profile
            </h2>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      {/* Hero Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-primary/10 to-primary/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-9 pb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="text-4xl bg-primary/10">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </h1>
                  <p className="text-muted-foreground">
                    Welcome to your grocery shopping profile
                  </p>
                </div>
                <div className="md:ml-auto">
                  <Badge variant="default" className="text-sm">
                    {user.role}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Left Column - User Info */}
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <span>Account Type: {user.provider}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Member since {format(new Date(), "MMMM yyyy")}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span>
                  {
                    orders.filter((order) => order.status === "Completed" ||  order.status === "Paid")
                      .length
                  }{" "}
                  Orders
                </span>
              </div>
            </div>
          </Card>

          {/* Middle Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: ShoppingBag,
                    label: "Orders",
                    desc: "View history",
                    link: "/order",
                  },
                  {
                    icon: Heart,
                    label: "Lists",
                    desc: "Saved items",
                    link: "/order",
                  },
                  {
                    icon: Lock,
                    label: "Password",
                    desc: "Change password",
                    link: "/change-password",
                  },
                  {
                    icon: UserCog,
                    label: "Edit Profile",
                    desc: "Update details",
                    link: "/edit-profile",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:bg-accent cursor-pointer transition-all hover:scale-105"
                  >
                    <Link
                      href={item.link}
                      className="flex flex-col items-center text-center gap-2"
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </Link>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {orders.filter((order) => order.status === "Paid" || order.status === "Completed").length >
                0 ? (
                  orders
                    .filter((order) => order.status === "Paid" || order.status === "Completed")
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) 
                    .slice(0, 2)
                    .map((order) => (
                      <div
                        key={order._id}
                        className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg"
                      >
                        <ShoppingBag className="w-6 h-6 text-primary" />
                        <div className="flex-1">
                          <h3 className="font-medium">
                            Order #{order._id.slice(-6)}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {order.orders.length} items - Total: ৳
                            {order.orders.reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(order.createdAt), "PPP")}
                          </p>
                        </div>
                        <Badge variant="default">{order.status}</Badge>
                      </div>
                    ))
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
                    <ShoppingBag className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-medium">No paid orders yet</h3>
                      <p className="text-sm text-muted-foreground">
                        Your completed orders will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
