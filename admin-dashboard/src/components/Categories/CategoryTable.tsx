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
        const response = await fetch("http://localhost:5000/api/category");
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
    <div className="rounded-md border border-zinc-800">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead className="text-zinc-400">Created At</TableHead>
            <TableHead className="text-zinc-400">Name</TableHead>
            <TableHead className="text-zinc-400">Image</TableHead>
            <TableHead className="text-zinc-400">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-white py-8">
                Loading...
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
                <TableCell className="text-white">
                  {category.createdAt ? formatDate(category.createdAt) : "N/A"}
                </TableCell>
                <TableCell className="text-white">{category.name}</TableCell>
                <TableCell className="text-white">
                  <Image
                    width={40}
                    height={40}
                    src={category.image || "https://via.placeholder.com/40"}
                    alt={category.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <div className="text-blue-600 hover:text-blue-400 mr-2 ">
                        <FilePenLine />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      {/* change */}
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
