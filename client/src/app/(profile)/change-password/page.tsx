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
import { KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Current password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      // Make the API call to change the password
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/changePassword`,
        {
          currentPass: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");
        form.reset();
      } else {
        toast.error(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to change password. Please try again.");
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
              Please sign in to change your password
            </h2>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6 mt-6">
          <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full backdrop-blur-sm">
            <KeyRound className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Change Password</h1>
            <p className="text-xs text-muted-foreground">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle>Password Settings</CardTitle>
            <CardDescription>
              Make sure your new password is different from your current
              password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Changing Password...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Password Requirements:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Minimum 6 characters long</li>
                <li>• Include both uppercase and lowercase characters</li>
                <li>• Include at least one number</li>
                <li>• Include at least one special character</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
