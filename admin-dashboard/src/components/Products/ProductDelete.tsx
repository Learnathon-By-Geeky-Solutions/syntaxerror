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
import { Product } from "@/types/types";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
  
  export default function ProductDelete({
    product,
    setProducts
  }: {
    product: Product;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  }) {
    const handleDelete = async() => {
        const res = await axios.delete(`http://localhost:5000/api/product/${product._id}`);
          console.log(res.data.data);
          setProducts(prevProducts => 
            prevProducts.filter((p) => p._id !== product._id)
          );
          toast.success("Product deleted successfully");
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-red-600"><Trash2 /></button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  