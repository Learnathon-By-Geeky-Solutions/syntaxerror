"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { AuthForm } from "./AuthForm";

export function LoginForm() {

  const router = useRouter();
  
  const loginMutation = useMutation({
    mutationFn: async (formData: { email: any; password: any }) => {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Login Successful')
      router.push("/");
    },
    onError: () => {
      toast.error(`Something went wrong! Please try again.`);
    },
  });

  const handleLoginSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    loginMutation.mutate({ email, password });
    
  };

  return <AuthForm type="login" onSubmit={handleLoginSubmit} />;
}
