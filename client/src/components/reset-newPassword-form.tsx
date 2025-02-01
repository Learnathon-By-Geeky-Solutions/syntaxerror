"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ResetNewPass() {
  const [otp, setOtp] = useState("");

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };


  const setNewPassMutation = useMutation({
    mutationFn: async (formData: { email: any; code: any, newPassword:any, confirmPassword:any }) => {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        formData,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push("/login");
    },
    onError: () => {
      toast.error(`Something went wrong! Please try again.`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    setNewPassMutation.mutate({ email:email, code: otp, newPassword: newPassword, confirmPassword: confirmPassword });
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
                  Enter your code and new password
                </p>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="name">Code</Label>
                <div>
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={handleOTPChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />                     
                      <InputOTPSeparator />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
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
              src="/assets/images/AuthRegister.png"
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
