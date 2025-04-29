import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/types/types";
import { formatDate } from "@/utils";
import { FilePenLine } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CategoryDelete from "./CategoryDelete";
import CategoryEdit from "./CategoryEdit";

interface CategoryTableProps {
  searchTerm: string;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  isLoading: boolean;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  searchTerm,
  categories = [], // Default empty array
  setCategories,
  isLoading,
}) => {
  const [localCategories, setLocalCategories] =
    useState<Category[]>(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`);
        const data = await response.json();
        if (data.success) {
          setLocalCategories(data.data);
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [setCategories]);

  const filteredCategories = localCategories.filter((category) =>
    category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="rounded-md border border-zinc-800 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead className="text-zinc-400 hidden md:table-cell">Created At</TableHead>
            <TableHead className="text-zinc-400 min-w-[150px]">Name</TableHead>
            <TableHead className="text-zinc-400">Image</TableHead>
            <TableHead className="text-zinc-400 w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-white py-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : filteredCategories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-white py-8">
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            filteredCategories.map((category) => (
              <TableRow key={category._id} className="border-zinc-800">
                <TableCell className="text-white hidden md:table-cell text-sm">
                  {category.createdAt ? formatDate(category.createdAt) : "N/A"}
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm sm:text-base">{category.name}</span>
                    {/* Show date on mobile */}
                    <span className="text-xs text-zinc-400 md:hidden">
                      {category.createdAt ? formatDate(category.createdAt) : "N/A"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  <Image
                    width={40}
                    height={40}
                    src={category.image || "https://via.placeholder.com/40"}
                    alt={category.name}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end sm:justify-start space-x-2">
                    <Dialog>
                      <DialogTrigger>
                        <div className="p-2 text-blue-600 hover:text-blue-400 transition-colors">
                          <FilePenLine className="h-4 w-4" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-lg">Edit Category</DialogTitle>
                          <DialogDescription className="text-zinc-400">
                            Make changes to your category here
                          </DialogDescription>
                        </DialogHeader>
                        <CategoryEdit
                          categories={category}
                          setCategories={setCategories}
                          onSuccess={() => {
                            const dialogClose = document.querySelector(
                              '[data-state="open"]'
                            );
                            if (dialogClose instanceof HTMLElement) {
                              dialogClose.click();
                            }
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                    <CategoryDelete
                      categories={category}
                      setCategories={setCategories}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
