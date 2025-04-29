"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "register"; 
  onSubmit: (formData: FormData) => void;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };


  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {type === "login" ? "Welcome back" : "Join us"}
                </h1>
                <p className="text-balance text-muted-foreground">
                  {type === "login"
                    ? "Login to your iKrishak Admin account"
                    : "Register a new iKrishak Admin account"}
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

              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/resetPassword"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {type === "login" ? "Login" : "Register"}
              </Button>
            </div>
          </form>

          <div className="relative hidden bg-muted md:block">
            <Image
              src={type === "login" ? "/assets/images/Auth.png" : "/assets/images/AuthRegister.png"}
              alt="Auth Background"
              fill
              className="object-cover"
              quality={100}
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
