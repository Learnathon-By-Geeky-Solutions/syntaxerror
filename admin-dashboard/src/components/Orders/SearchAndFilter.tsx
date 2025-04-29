"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";
import { useState } from "react";

interface SearchAndFilterProps {
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (status: string) => void;
  searchTerm: string;
  currentStatus: string;
}

export function SearchAndFilter({ 
  onSearchChange, 
  onStatusFilterChange,
  searchTerm,
  currentStatus 
}: SearchAndFilterProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className={`relative flex-grow ${isFocused ? 'ring-1 ring-primary/40' : ''}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-500" />
        </div>
        
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-10 pr-10 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200"
        />
        
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="w-full md:w-48">
        <Select
          value={currentStatus}
          onValueChange={onStatusFilterChange}
        >
          <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-white focus:ring-1 focus:ring-primary">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-500" />
              <SelectValue placeholder="Filter by status" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}