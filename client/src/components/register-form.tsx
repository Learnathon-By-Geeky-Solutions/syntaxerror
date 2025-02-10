"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AuthForm } from "./AuthForm";
import { Button } from "./ui/button";

export function RegisterForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  // const [userdata, setUserdata] = useState({});
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (formData: { name: string; email: string; password: string }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        formData,
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Verification code sent to your email");
      //router.push("/verifyEmail");
      setIsDialogOpen(true);
      setEmail(data.data.email);
    },
    onError: () => {
      toast.error(`Something went wrong! Please try again.`);
    },
  });

  const handleRegisterSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    registerMutation.mutate({ name, email, password });
    // setUserdata({ name, email, password });
  };


  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  const otpMutation = useMutation({
    mutationFn: async (formData: { email: string; code: string }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify`,
        formData,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful");
      router.push("/login");
    },
    onError: () => {
      toast.error(`OTP is incorrect!`);
    },
  });

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      otpMutation.mutate({ email: email, code: otp });
    } else {
      toast.error("Email is required");
    }
  };

  return (
    <>
      <AuthForm type="register" onSubmit={handleRegisterSubmit} />
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify your email</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleOtpSubmit}
              className="flex flex-col items-center justify-center gap-2"
            >
              <label className="text-lg font-semibold">One-Time Password</label>

              {/* ✅ OTP Input */}
              <InputOTP maxLength={6} value={otp} onChange={handleOTPChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <p className="text-sm text-gray-500">
                Please enter the one-time password sent to your email.
              </p>

              {/* Submit Button */}
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
