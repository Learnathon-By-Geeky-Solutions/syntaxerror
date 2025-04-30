import { ImageUpload } from "@/components/ui/image-upload"; // Add this import
import { Category, Product } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// Update the form schema
const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  discount: z.number().min(0, "Discount must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().min(1, "Image is required"),
  categoryId: z.string().min(1, "Category is required"), // Add this line
});

// Update the useForm defaultValues to include categoryId
export default function ProductEdit({
  product,
  categories,
  setProducts
}: {
  product: Product;
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      stock: product.stock,
      discount: product.discount,
      description: product.description,
      image: product.image || "",
      categoryId: product.category?._id || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${product._id}`, {
      ...values,
      category: values.categoryId,
    });
    console.log(res.data.data);
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product._id === res.data.data._id ? res.data.data : product
      )
    );
    toast.success("Product updated successfully");
    form.reset();
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="overflow-y-auto max-h-[70vh] px-2">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-gray-300">Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-gray-900 border-gray-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-gray-300">Title</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-900 border-gray-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="my-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-300">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-24 bg-gray-900" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-300">Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-2 rounded-md bg-gray-900 border-gray-800 text-white"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-300">Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      className="bg-gray-900 border-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-300">Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      className="bg-gray-900 border-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-300">Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      className="bg-gray-900 border-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
