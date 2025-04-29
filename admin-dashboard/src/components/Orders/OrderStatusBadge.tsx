"use client";

import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
  status: string;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  // Define colors based on status
  const getStatusStyles = () => {
    switch (status) {
      case "Paid":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "Completed":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-500 border-zinc-500/30";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStatusStyles(),
        className
      )}
    >
      {status}
    </span>
  );
}