"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderStatusSwitch } from "./OrderStatusSwitch";

interface OrderItemProps {
  order: Order;
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

export function OrderItem({ order, onStatusChange }: OrderItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Calculate total order value
  const orderTotal = order.orders.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formattedDate = new Date(order.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-zinc-700">
      <div 
        className="p-4 cursor-pointer flex flex-col sm:flex-row justify-between gap-4"
        onClick={toggleExpand}
      >
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-medium flex items-center gap-2">
              Order ID: <span className="text-zinc-400 text-sm">{order._id}</span>
            </h3>
            <div className="flex sm:hidden">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-zinc-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-zinc-400" />
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm">
            <div className="flex items-center">
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="text-zinc-400">
              {formattedDate}
            </div>
            <div className="text-white font-medium">
              {orderTotal}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between sm:justify-end">
          <div className="hidden sm:flex items-center">
            <OrderStatusSwitch 
              orderId={order._id}
              initialStatus={order.status}
              onStatusChange={onStatusChange}
            />
          </div>
          <div className="hidden sm:block">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-zinc-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-zinc-400" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile view of status switch */}
      <div className="px-4 pb-2 sm:hidden">
        <OrderStatusSwitch 
          orderId={order._id}
          initialStatus={order.status}
          onStatusChange={onStatusChange}
        />
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-zinc-800 animate-accordion-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-zinc-300 font-medium mb-2">Customer Information</h4>
              <div className="bg-zinc-950 p-3 rounded-md space-y-2">
                <p className="text-white text-sm">
                  <span className="text-zinc-500">Name:</span> {order.customerInfo.fullName}
                </p>
                <p className="text-white text-sm">
                  <span className="text-zinc-500">Email:</span> {order.customerInfo.email}
                </p>
                <p className="text-white text-sm">
                  <span className="text-zinc-500">Contact:</span> {order.customerInfo.contact}
                </p>
                <p className="text-white text-sm">
                  <span className="text-zinc-500">Address:</span> {order.customerInfo.address}
                </p>
                {order.customerInfo.note && (
                  <p className="text-white text-sm">
                    <span className="text-zinc-500">Note:</span> {order.customerInfo.note}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-zinc-300 font-medium">Order Items</h4>
              {order.orders.map((item) => (
                <div 
                  key={item._id}
                  className="flex items-center gap-3 p-3 bg-zinc-950 rounded-md"
                >
                  <div className="relative h-14 w-14 flex-shrink-0">
                    <Image
                      fill
                      src={item.image}
                      alt={item.title}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
                    <div className="flex justify-between text-xs text-zinc-400 mt-1">
                      <span>{item.quantity} × {item.price}</span>
                      <span className="font-medium text-white">{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-800">
                <span className="text-zinc-300">Total:</span>
                <span className="text-white font-medium">{orderTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}