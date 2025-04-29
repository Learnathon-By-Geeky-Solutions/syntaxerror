"use client";

import { Package2Icon, SearchX } from "lucide-react";

interface EmptyStateProps {
  isFiltered: boolean;
}

export function EmptyState({ isFiltered }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-zinc-800 rounded-lg text-center">
      {isFiltered ? (
        <>
          <SearchX className="h-12 w-12 text-zinc-700 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-1">No matching orders found</h3>
          <p className="text-zinc-500 max-w-md">
            Try adjusting your search or filter criteria to find what you&apos;re looking for.
          </p>
        </>
      ) : (
        <>
          <Package2Icon className="h-12 w-12 text-zinc-700 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-1">No orders yet</h3>
          <p className="text-zinc-500 max-w-md">
            Orders will appear here once customers make purchases.
          </p>
        </>
      )}
    </div>
  );
}