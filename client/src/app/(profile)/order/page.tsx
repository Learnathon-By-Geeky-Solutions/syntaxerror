"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
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
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  _id: string;
}

interface Order {
  _id: string;
  customerInfo: {
    fullName: string;
    contact: string;
    email: string;
    address: string;
    note: string;
  };
  orders: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/order?email=${user?.email}`,
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

  const toggleOrderExpansion = (orderId: string) => {
    const newExpandedOrders = new Set(expandedOrders);
    if (expandedOrders.has(orderId)) {
      newExpandedOrders.delete(orderId);
    } else {
      newExpandedOrders.add(orderId);
    }
    setExpandedOrders(newExpandedOrders);
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
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Calculate order statistics
  const calculateStatistics = (orders: Order[]) => {
    // Calculate total spent
    const totalSpent = orders.reduce((sum, order) => {
      return sum + order.orders.reduce((orderSum, item) => {
        return orderSum + (item.price * item.quantity);
      }, 0);
    }, 0);

    // Calculate total number of products purchased
    const totalItems = orders.reduce((sum, order) => {
      return sum + order.orders.reduce((orderSum, item) => {
        return orderSum + item.quantity;
      }, 0);
    }, 0);

    // Count orders by status
    const pendingOrders = orders.filter(order => 
      order.status.toLowerCase() === 'pending'
    ).length;
    
    const processingOrders = orders.filter(order => 
      order.status.toLowerCase() === 'processing'
    ).length;

    const shippedOrders = orders.filter(order => 
      order.status.toLowerCase() === 'shipped'
    ).length;
    
    return {
      totalSpent,
      totalItems,
      pendingOrders,
      processingOrders,
      shippedOrders
    };
  };

  if (!user) {
    return (
      <div className="my-12 py-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200">
              Please sign in to view your orders
            </h2>
          </div>
        </Card>
      </div>
    );
  }

  const stats = calculateStatistics(orders);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Order Voyage Tracker
              </h1>
              <p className="text-muted-foreground">
                Track and manage your purchase history
              </p>
            </div>
          </div>
        </div>

        {orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-5 flex gap-4 items-center hover:card-highlight transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Orders</p>
                <p className="text-2xl font-semibold">{orders.length}</p>
              </div>
            </Card>

            <Card className="p-5 flex gap-4 items-center hover:card-highlight transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Items Purchased</p>
                <p className="text-2xl font-semibold">{stats.totalItems}</p>
              </div>
            </Card>

            <Card className="p-5 flex gap-4 items-center hover:card-highlight transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Spent</p>
                <p className="text-2xl font-semibold">৳{stats.totalSpent.toLocaleString()}</p>
              </div>
            </Card>

            <Card className="p-5 flex gap-4 items-center hover:card-highlight transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">In Transit</p>
                <div className="flex gap-1.5 mt-1">
                  {stats.pendingOrders > 0 && (
                    <div className="flex items-center gap-1 status-pill status-pending text-xs py-0.5 px-2">
                      <Clock className="h-3 w-3" />
                      <span>{stats.pendingOrders}</span>
                    </div>
                  )}
                  {stats.processingOrders > 0 && (
                    <div className="status-pill status-processing text-xs py-0.5 px-2">
                      <Package className="h-3 w-3" />
                      <span>{stats.processingOrders}</span>
                    </div>
                  )}
                  {stats.shippedOrders > 0 && (
                    <div className="status-pill status-shipped text-xs py-0.5 px-2">
                      <Truck className="h-3 w-3" />
                      <span>{stats.shippedOrders}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="space-y-6">
          {orders.length === 0 ? (
            <Card className="p-12 text-center backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
              <div className="p-4 bg-primary/5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">No orders yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                When you make a purchase, your orders will appear here. Start
                shopping to create your first order!
              </p>
            </Card>
          ) : (
            orders.map((order) => (
              <Card
                key={order._id}
                className="overflow-hidden backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 hover:border-primary/20 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-lg">
                          Order #{order._id.slice(-8)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(order.createdAt), "MMM d, yyyy")}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {format(new Date(order.createdAt), "h:mm a")}
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Total: ৳
                          {order.orders.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        className={cn(
                          "px-3 py-1.5 flex items-center gap-2",
                          getStatusColor(order.status)
                        )}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="text-primary hover:text-primary/80 transition-colors p-2 hover:bg-primary/10 rounded-full"
                      >
                        {expandedOrders.has(order._id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedOrders.has(order._id) && (
                    <div className="mt-6 space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Truck className="w-5 h-5 text-primary" />
                            <h3 className="font-medium">Order Details</h3>
                          </div>
                          <div className="space-y-3">
                            {order.orders.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center gap-4 bg-accent/50 p-4 rounded-xl hover:bg-accent/70 transition-colors"
                              >
                                <div className="relative w-20 h-20">
                                  <Image
                                    fill
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover rounded-lg"
                                    sizes="80px"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium mb-1">{item.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity} × ৳{item.price}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-lg">
                                  ৳{item.price * item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">
                                Total Amount
                              </span>
                              <p className="text-xl font-semibold">
                              ৳
                                {order.orders.reduce(
                                  (sum, item) => sum + item.price * item.quantity,
                                  0
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-primary" />
                            <h3 className="font-medium">Shipping Information</h3>
                          </div>
                          <Card className="p-6 space-y-4 bg-card/50">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Name
                              </p>
                              <p className="font-medium">
                                {order.customerInfo.fullName}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Contact
                              </p>
                              <p className="font-medium">
                                {order.customerInfo.contact}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Email
                              </p>
                              <p className="font-medium">
                                {order.customerInfo.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Delivery Address
                              </p>
                              <div className="flex items-start gap-2 bg-accent/30 p-3 rounded-lg">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                                <p className="font-medium">
                                  {order.customerInfo.address}
                                </p>
                              </div>
                            </div>
                            {order.customerInfo.note && (
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  Note
                                </p>
                                <div className="bg-accent/30 p-3 rounded-lg">
                                  <p className="font-medium">
                                    {order.customerInfo.note}
                                  </p>
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