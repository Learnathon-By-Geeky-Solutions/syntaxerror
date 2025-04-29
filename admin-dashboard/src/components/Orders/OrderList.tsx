"use client";

import { EmptyState } from "./EmptyState";
import { OrderItem } from "./OrderItem";
import { PaginationComponent } from "./PaginationComponent";

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
  isFiltered: boolean;
  paginationMeta: PaginationMeta;
  onPageChange: (page: number) => void;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

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

export function OrderList({
  orders,
  isLoading,
  isFiltered,
  paginationMeta,
  onPageChange,
  onStatusChange,
}: OrderListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 animate-pulse"
          >
            <div className="h-6 bg-zinc-800 rounded w-1/4 mb-3"></div>
            <div className="flex gap-2 mb-3">
              <div className="h-5 bg-zinc-800 rounded w-16"></div>
              <div className="h-5 bg-zinc-800 rounded w-32"></div>
            </div>
            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyState isFiltered={isFiltered} />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem
          key={order._id}
          order={order}
          onStatusChange={onStatusChange}
        />
      ))}

      {paginationMeta.totalPages > 1 && (
        <PaginationComponent
          currentPage={paginationMeta.page}
          totalPages={paginationMeta.totalPages}
          onPageChange={onPageChange}
          hasNextPage={paginationMeta.hasNext}
          hasPreviousPage={paginationMeta.hasPrev}
        />
      )}
    </div>
  );
}