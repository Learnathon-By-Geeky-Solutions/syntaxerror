"use client";

import { OrderList } from "@/components/Orders/OrderList";
import { SearchAndFilter } from "@/components/Orders/SearchAndFilter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { Package2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Interfaces
interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  _id: string;
}

interface CustomerInfo {
  fullName: string;
  contact: string;
  email: string;
  address: string;
  note: string;
}

interface ConsumerId {
  _id: string;
  name: string;
  email: string;
}

interface Order {
  _id: string;
  customerInfo: CustomerInfo;
  consumerId: ConsumerId;
  orders: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
  sessionId: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function OrdersPage() {
  const {user} = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  // 🛒 Fetch all orders once
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders?limit=1000`);
      const data = await response.json();

      if (data.success) {
        setAllOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 🎯 Filter orders locally by search term and status
  const filterOrders = useCallback(() => {
    let orders = [...allOrders];

    // 🔵 Filter by Status
    if (statusFilter !== "all") {
      orders = orders.filter((order) => order.status === statusFilter);
    }

    // 🔵 Filter by Search Term (Order ID)
    if (searchTerm.trim() !== "") {
      orders = orders.filter((order) =>
        order._id.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    setFilteredOrders(orders);

    // 🎯 Update Pagination
    const totalPages = Math.ceil(orders.length / paginationMeta.limit) || 1;
    setPaginationMeta((prev) => ({
      ...prev,
      total: orders.length,
      totalPages,
      hasNext: paginationMeta.page < totalPages,
      hasPrev: paginationMeta.page > 1,
      page: Math.min(prev.page, totalPages),
    }));

  }, [allOrders, searchTerm, statusFilter, paginationMeta.limit, paginationMeta.page]);

  // Run filter when dependencies change
  useEffect(() => {
    filterOrders();
  }, [filterOrders]);

  // 🔵 Handle Search Input Change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPaginationMeta((prev) => ({ ...prev, page: 1 }));
  };

  // 🔵 Handle Status Dropdown Change
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setPaginationMeta((prev) => ({ ...prev, page: 1 }));
  };

  // 🔵 Handle Page Change
  const handlePageChange = (page: number) => {
    setPaginationMeta((prev) => ({ ...prev, page }));
  };

  // 🔵 Update Order Status (Mark as Completed)
  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    setAllOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    // 🆕 Immediately re-filter to show UI update
    filterOrders();
  };

  // 🔵 Paginate filtered orders
  const startIndex = (paginationMeta.page - 1) * paginationMeta.limit;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + paginationMeta.limit);

  if(!user) {
    return(
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
    )
  }


  return (
    <div className="min-h-screen bg-background">
      <div className="lg:min-w-[75vw] lg:p-8 p-4 mx-auto">
        <Card className="bg-zinc-950 min-w-full border-zinc-800 shadow-lg animate-in fade-in-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Package2 className="h-6 w-6 text-primary" />
              <CardTitle className="text-white">Orders</CardTitle>
            </div>
            <CardDescription className="text-zinc-400">
              View and manage customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <SearchAndFilter
                onSearchChange={handleSearchChange}
                onStatusFilterChange={handleStatusFilterChange}
                searchTerm={searchTerm}
                currentStatus={statusFilter}
              />
            </div>

            <OrderList
              orders={paginatedOrders}
              isLoading={isLoading}
              isFiltered={!!searchTerm || statusFilter !== "all"}
              paginationMeta={paginationMeta}
              onPageChange={handlePageChange}
              onStatusChange={handleOrderStatusChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
