"use client";
import AddCategoryForm from "@/components/Categories/AddCategoryForm";
import CategoryTable from "@/components/Categories/CategoryTable";
import SearchBar from "@/components/Products/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { Category } from "@/types/types";
import { Package2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {user} = useUser();
  const router = useRouter();

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`);
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
    <div className="lg:min-w-[75vw] lg:p-8 p-4">
      <Card className="mx-auto bg-zinc-950 border-zinc-800 max-w-7xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-white" />
            <CardTitle className="text-white">Categories</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Manage your product categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger>
                <div className="flex justify-end items-center mb-4 gap-2 px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-blue-600 text-sm">
                  <Plus size={20} strokeWidth={2.75} />
                  Add Category
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                  <DialogDescription>Add a new category</DialogDescription>
                </DialogHeader>
                <AddCategoryForm
                  onSuccess={() => {
                    fetchCategories();
                    const dialogClose = document.querySelector('[data-state="open"]');
                    if (dialogClose instanceof HTMLElement) {
                      dialogClose.click();
                    }
                  }}
                  onCancel={() => {
                    const dialogClose = document.querySelector('[data-state="open"]');
                    if (dialogClose instanceof HTMLElement) {
                      dialogClose.click();
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <CategoryTable
            categories={categories}
            setCategories={setCategories}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
        </CardContent>
      </Card>
    </div>
  );
}