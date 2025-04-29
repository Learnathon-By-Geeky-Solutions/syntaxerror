"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

interface OrderStatusSwitchProps {
  orderId: string;
  initialStatus: string;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

export function OrderStatusSwitch({
  orderId,
  initialStatus,
  onStatusChange,
}: OrderStatusSwitchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isCompleted = initialStatus === "Completed";
  const [isChecked, setIsChecked] = useState(isCompleted);

  const handleStatusChange = async () => {
    // Only allow changing from Paid to Completed
    if (initialStatus !== "Paid" && !isCompleted) {
      toast.error("Only Paid orders can be marked as Completed");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();

      setIsChecked(true);
      console.log(data)
      onStatusChange(orderId, "Completed");
      toast.success("Order status updated to Completed");
    } catch (error) {
      console.error("Error updating order status:", error);
      setIsChecked(isCompleted);
      toast.error("Failed to update order status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={`complete-switch-${orderId}`}
        checked={isChecked}
        onCheckedChange={handleStatusChange}
        disabled={isLoading || initialStatus === "Pending" || isChecked}
        className={isChecked ? "bg-blue-500" : ""}
      />
      <Label
        htmlFor={`complete-switch-${orderId}`}
        className="text-sm text-zinc-300 cursor-pointer"
      >
        {isChecked ? "Completed" : "Mark as Completed"}
      </Label>
    </div>
  );
}
