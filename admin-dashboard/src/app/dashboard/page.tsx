"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Box, DollarSign, ShoppingCart, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useUser } from "../../hooks/useUser";

interface Order {
  _id: string;
  consumerId: { _id: string; name: string; email: string };
  orders: { price: number; quantity: number; productId: string }[]; // Added productId
  status: string;
  createdAt: string;
}

interface Product {
  _id: string;
  title: string;
  stock: number;
  category: { _id: string; name: string };
  price: number;
}

interface Category {
  _id: string;
  name: string;
}

interface User {
  _id: string;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes, categoriesRes, usersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders?limit=999999`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`),
        ]);

        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        const usersData = await usersRes.json();

        setOrders(ordersData.data || []);
        setProducts(productsData.data || []);
        setCategories(categoriesData.data || []);
        setUsers(usersData.data || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if(!user) {
    return (
        <div className="flex items-center justify-center">
        <Card className="w-full border-zinc-800">
          <CardHeader>
            <CardTitle className="text-center text-white">Access Denied</CardTitle>
            <CardDescription className="text-center text-zinc-400">
              You need to be logged in as an admin to view this page
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={() => router.push('/login')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="p-6 text-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  // 📦 Calculations
  const completedOrPaidOrders = orders.filter(
    (order) => order.status === "Completed" || order.status === "Paid"
  );

  const totalRevenue = completedOrPaidOrders.reduce((sum, order) => {
    return sum + order.orders.reduce((orderSum, item) => orderSum + item.price * item.quantity, 0);
  }, 0);

  const totalOrders = completedOrPaidOrders.length;

  const activeUsers = users.length;

  const stockItems = products.reduce((sum, product) => sum + product.stock, 0);

  // Sales Overview - Grouped by month
  const salesOverview = completedOrPaidOrders.reduce((acc: Record<string, number>, order) => {
    const month = new Date(order.createdAt).toLocaleString("default", { month: "short" });
    const total = order.orders.reduce((orderSum, item) => orderSum + item.price * item.quantity, 0);
    acc[month] = (acc[month] || 0) + total;
    return acc;
  }, {});

  const salesOverviewData = Object.entries(salesOverview).map(([month, sales]) => ({ month, sales }));

  // Category Performance - Quantity sold per category
  const categorySales = completedOrPaidOrders.flatMap((order) => order.orders);

  const categoryPerformance = categories.map((category) => {
    const totalQuantity = products
      .filter((product) => product.category._id === category._id)
      .reduce((sum, product) => {
        const productQuantity = categorySales
          .filter((item) => item.productId === product._id)
          .reduce((s, i) => s + i.quantity, 0);
        return sum + productQuantity;
      }, 0);

    return { name: category.name, quantity: totalQuantity };
  });

  const recentActivities = completedOrPaidOrders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((order) => ({
      activity: `Order #${order._id.substring(0, 6)} (${order.status})`,
      time: order.createdAt,
    }));

  return (
    <div className="p-6 space-y-6 bg-background w-[100vw] md:w-[75vw] mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#fab00560] to-[#ff8787]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#05a4fa4f] to-[#ffbf87d3]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#7bfa0570] to-[#87fff372]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#cd05fa62] to-[#ff87ffa5]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Items</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockItems}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={salesOverviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Items sold by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={categoryPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#82ca9a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent user activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-center">
                    <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">{new Date(activity.time).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
