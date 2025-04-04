"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil, Upload, User2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z.string().optional(),
});

export default function EditProfilePage() {
  const { user, refetchUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.image || null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      image: user?.image || "",
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setIsLoading(true);
        try {
          const data = new FormData();
          data.append("file", file);
          data.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
          );
          data.append(
            "cloud_name",
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string
          );

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: data,
            }
          );
          const fileData = await res.json();
          form.setValue("image", fileData.url);
          setPreviewImage(fileData.url);
          toast.success("Image uploaded successfully!");
        } catch (error) {
          console.log(error);
          toast.error("Failed to upload image. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  const removeImage = () => {
    form.setValue("image", "");
    setPreviewImage(null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        console.log(values)
      setIsLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/editProfile`,
        {name: values.name, image: values.image},
        {
          withCredentials: true,
        }
      );

      await refetchUser();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false);
    }
  }
  if (!user) {
    return (
      <div className="my-12 py-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200">
              Please sign in to edit your profile
            </h2>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-full">
            <Pencil className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Edit Profile
            </h1>
            <p className="text-muted-foreground">
              Update your profile information
            </p>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Make changes to your profile here</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                              isDragActive
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center gap-2">
                              {previewImage ? (
                                <div className="relative">
                                  <Image
                                    src={previewImage}
                                    alt="Preview"
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeImage();
                                    }}
                                    className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                                  <User2 className="w-10 h-10 text-muted-foreground" />
                                </div>
                              )}
                              <div className="text-center">
                                <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  Drag & drop or click to upload
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Max file size: 5MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
