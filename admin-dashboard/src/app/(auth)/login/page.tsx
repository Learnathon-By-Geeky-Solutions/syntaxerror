import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </Suspense>
  );
}
