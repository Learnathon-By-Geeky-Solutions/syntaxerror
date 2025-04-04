import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Category } from "@/types/types";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CategoryDelete({
  categories,
  setCategories,
}: {
  categories: Category;
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:5000/api/category/${categories._id}`
    );
    console.log(res.data.data);
    setCategories((prevCategories) =>
      prevCategories.filter((p) => p._id !== categories._id)
    );
    toast.success("Product deleted successfully");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-600">
          <Trash2 />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
