import { ResetNewPass } from "@/components/reset-newPassword-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <ResetNewPass />
        </div>
      </div>
    </Suspense>
  );
}
