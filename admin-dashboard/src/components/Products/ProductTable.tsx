import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category, Product } from "@/types/types";
import { FilePenLine } from "lucide-react";
import Image from "next/image";
import ProductDelete from "./ProductDelete";
import ProductEdit from "./ProductEdit";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  searchTerm: string;
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  searchTerm,
  categories,
  setProducts
}) => {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-md border border-zinc-800">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead className="text-zinc-400">Product</TableHead>
            <TableHead className="text-zinc-400">Category</TableHead>
            <TableHead className="text-zinc-400">Price</TableHead>
            <TableHead className="text-zinc-400">Stock</TableHead>
            <TableHead className="text-zinc-400">Discount</TableHead>
            <TableHead className="text-zinc-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-white py-8">
                Loading...
              </TableCell>
            </TableRow>
          ) : filteredProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-white py-8">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts.map((product) => (
              <TableRow key={product._id} className="border-zinc-800">
                <TableCell className="text-white">
                  <div className="flex items-center space-x-3">
                    <Image
                      width={40}
                      height={40}
                      src={product.image}
                      alt={product.title}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {product.category ? (
                    <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                      {product.category.name}
                    </span>
                  ) : (
                    <span className="text-zinc-500">No Category</span>
                  )}
                </TableCell>
                <TableCell className="text-white">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center w-10 rounded-full px-2 py-1 text-xs font-medium ${
                      product.stock > 10
                        ? "bg-green-500/20 text-green-400 ring-green-500/20"
                        : product.stock > 0
                        ? "bg-yellow-500/20 text-yellow-400 ring-yellow-500/20"
                        : "bg-red-500/20 text-red-400 ring-red-500/20"
                    } ring-1 ring-inset`}
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  {product.discount > 0 ? (
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                      {product.discount}% off
                    </span>
                  ) : (
                    <span className="text-zinc-500">-</span>
                  )}
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
                        <DialogDescription>
                          
                        </DialogDescription>
                      </DialogHeader>
                      {/* change */}
                      <ProductEdit product={product} categories={categories} setProducts={setProducts} />
                    </DialogContent>
                  </Dialog>
                  <ProductDelete product={product} setProducts={setProducts}></ProductDelete>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
