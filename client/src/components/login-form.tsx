"use client";
import { AuthForm } from "./AuthForm";

export function LoginForm() {
  const handleLoginSubmit = (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Login Email:", email);
    console.log("Login Password:", password);
  };

  return <AuthForm type="login" onSubmit={handleLoginSubmit} />;
}
