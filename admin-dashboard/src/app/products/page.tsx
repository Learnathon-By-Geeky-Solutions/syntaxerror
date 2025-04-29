"use client";
import AddProductForm from "@/components/Products/AddProductForm";
import PaginationComponent from "@/components/Products/PaginationComponent";
import ProductTable from "@/components/Products/ProductTable";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/useUser";
import { Category, PaginationInfo, Product } from "@/types/types";
import { Package2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function Index() {
  const { user } = useUser();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    total: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/product?page=${page}&limit=10`;

        if (selectedCategory && selectedCategory !== "all") {
          const category = categories.find(
            (cat) => cat._id === selectedCategory
          );
          if (category) {
            url += `&categoryName=${category.name}`;
          }
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
          setPaginationInfo(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [categories, selectedCategory]
  );

  useEffect(() => {
    // Fetch categories
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data));
  }, []);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, selectedCategory, fetchProducts]);

  // Debounce search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

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
            <CardTitle className="text-white">Products</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Manage your product inventory, prices, and categories
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex justify-end">
            <Dialog>
              <DialogTrigger>
                <div className="flex justify-end items-center mb-4 gap-2 px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-blue-600 text-sm">
                <Plus size={20} strokeWidth={2.75} />
                Add Product
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Product</DialogTitle>
                  <DialogDescription>Add a new product to your inventory</DialogDescription>
                </DialogHeader>
                <AddProductForm 
                  categories={categories}
                  onSuccess={() => {
                    fetchProducts(currentPage);
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
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[200px] bg-zinc-900 border-zinc-800 text-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all" className="text-white">
                  All Categories
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category._id}
                    value={category._id}
                    className="text-white"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ProductTable
            products={products}
            isLoading={isLoading}
            searchTerm={searchTerm}
            categories={categories}
            setProducts={setProducts}
          />

          {paginationInfo.totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={paginationInfo.totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Index;
