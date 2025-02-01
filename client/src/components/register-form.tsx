"use client";
import { AuthForm } from "./AuthForm";

export function RegisterForm() {
  const handleRegisterSubmit = (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Register Name:", name);
    console.log("Register Email:", email);
    console.log("Register Password:", password);
  };

  return <AuthForm type="register" onSubmit={handleRegisterSubmit} />;
}
