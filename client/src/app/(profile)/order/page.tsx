"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import { Order } from "@/types/types";
import axios from "axios";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  Loader,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function OrdersPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/order?email=${user?.email}`
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (prev.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle2 className="w-3 h-3" />;
      case "pending":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const calculateStats = (orders: Order[]) => {
    const totalSpent = orders
      .filter(order => ['paid', 'completed'].includes(order.status.toLowerCase()))
      .reduce(
        (sum, order) =>
          sum +
          order.orders.reduce((orderSum, item) => orderSum + item.price * item.quantity, 0),
        0
      );

    const totalItems = orders.reduce(
      (sum, order) =>
        sum + order.orders.reduce((orderSum, item) => orderSum + item.quantity, 0),
      0
    );

    const pendingOrders = orders.filter(
      (order) => order.status.toLowerCase() === "pending"
    ).length;
    const processingOrders = orders.filter(
      (order) => order.status.toLowerCase() === "paid"
    ).length;
    const shippedOrders = orders.filter(
      (order) => order.status.toLowerCase() === "completed"
    ).length;

    return { totalSpent, totalItems, pendingOrders, processingOrders, shippedOrders };
  };

  if (!user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <Card className="p-6 w-full max-w-sm mx-auto text-center">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-primary/60" />
          <h2 className="text-lg font-medium">Sign in to view orders</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const stats = calculateStats(orders);

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6 mt-6">
          <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full backdrop-blur-sm">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
            <p className="text-xs text-muted-foreground">Track your purchases</p>
          </div>
        </div>

        {orders.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <Card className="p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-0">
              <div className="flex gap-3 items-center">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm">
                  <ShoppingBag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Orders</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{orders.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 border-0">
              <div className="flex gap-3 items-center">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm">
                  <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Items</p>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.totalItems}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 border-0">
              <div className="flex gap-3 items-center">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm">
                  <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Total</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">৳{stats.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 border-0">
              <div className="flex gap-3 items-center">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm">
                  <Truck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">In Transit</p>
                  <div className="flex gap-1.5 mt-1">
                    {stats.processingOrders > 0 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                        <Clock className="w-3 h-3 mr-1" />
                        {stats.processingOrders}
                      </Badge>
                    )}
                    {stats.pendingOrders > 0 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                        <Package className="w-3 h-3 mr-1" />
                        {stats.pendingOrders}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}


        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card className="p-8 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-primary/60" />
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your order history will appear here after your first purchase
              </p>
            </Card>
          ) : (
            orders.map((order) => (
              <Card
                key={order._id}
                className="overflow-hidden hover:border-primary/20 transition-all"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-primary" />
                        <span className="font-medium">#{order._id.slice(-6)}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(order.createdAt), "MMM d, yyyy")}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="w-3 h-3" />
                          ৳{order.orders.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={cn(
                          "px-2 py-1 min-w-24 text-xs flex items-center gap-1",
                          getStatusColor(order.status)
                        )}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="text-primary p-1.5 hover:bg-primary/10 rounded-full"
                      >
                        {expandedOrders.has(order._id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedOrders.has(order._id) && (
                    <div className="mt-4 space-y-4">
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Package className="w-4 h-4 text-primary" />
                            <h3 className="font-medium text-sm">Items</h3>
                          </div>
                          <div className="space-y-2">
                            {order.orders.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center gap-3 bg-accent/50 p-3 rounded-lg"
                              >
                                <div className="relative w-16 h-16 flex-shrink-0">
                                  <Image
                                    fill
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover rounded-md"
                                    sizes="64px"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    {item.quantity} × ৳{item.price}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">
                                    ৳{item.price * item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-primary" />
                            <h3 className="font-medium text-sm">Delivery Info</h3>
                          </div>
                          <Card className="p-4 space-y-3 bg-card/50">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Name
                                </p>
                                <p className="text-sm font-medium">
                                  {order.customerInfo.fullName}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Contact
                                </p>
                                <p className="text-sm font-medium">
                                  {order.customerInfo.contact}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                Address
                              </p>
                              <div className="bg-accent/30 p-2 rounded-md">
                                <p className="text-sm">{order.customerInfo.address}</p>
                              </div>
                            </div>
                            {order.customerInfo.note && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Note
                                </p>
                                <div className="bg-accent/30 p-2 rounded-md">
                                  <p className="text-sm">{order.customerInfo.note}</p>
                                </div>
                              </div>
                            )}
                          </Card>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}