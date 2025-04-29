"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { UserProvider } from "../hooks/useUser";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideLayoutRoutes = [
    "/login",
    "/resetPassword",
    "/resetPassword/set-new-password",
  ];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  const queryClient = new QueryClient();

  return (
    <div>
      <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        {!shouldHideLayout ? (
          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger />
              <div className="container mx-auto lg:px-10 pt-4">{children}</div>
            </main>
          </SidebarProvider>
        ) : (
          <main>
            <div className="mx-auto">{children}</div>
          </main>
        )}
      </QueryClientProvider>
      </UserProvider>
    </div>
  );
}
