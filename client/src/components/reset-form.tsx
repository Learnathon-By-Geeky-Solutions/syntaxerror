"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ResetForm() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  const resetMutation = useMutation({
    mutationFn: async (formData: { email: string }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password-request`,
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Reset code sent to your email");
      router.push(`/resetPassword/set-new-password?email=${userEmail}`);
    },
    onError: () => {
      toast.error(`Email not found! Please try again.`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    setUserEmail(email);
    resetMutation.mutate({ email });
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email to reset your password
                </p>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Confirm
              </Button>
            </div>
          </form>

          <div className="relative hidden bg-muted md:block">
            <Image
              src="/assets/images/Auth.png"
              alt="Auth Background"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
              quality={100}
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
