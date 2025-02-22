import { RegisterForm } from "@/components/register-form";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm />
        </div>
      </div>
    </Suspense>
  );
}
