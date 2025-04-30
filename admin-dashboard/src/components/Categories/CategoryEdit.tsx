import { ImageUpload } from "@/components/ui/image-upload";
import { Category } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
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

// Update the form schema
const formSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),
  image: z.string().min(1, "Image is required"),
});

// Update the useForm defaultValues to include categoryId
export default function CategoryEdit({
  categories,
  setCategories,
  onSuccess
}: {
  categories: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  onSuccess?: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: categories.name,
      image: categories.image || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${categories._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values), // Send values directly, not wrapped in an object
        }
      );

      const data = await response.json();

      if (data.success) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === categories._id ? data.data : category
          )
        );
        toast.success("Category updated successfully");
        onSuccess?.(); // Call onSuccess if provided
        form.reset();
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error("Failed to update category");
    }
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
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-gray-300">Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-900 border-gray-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
