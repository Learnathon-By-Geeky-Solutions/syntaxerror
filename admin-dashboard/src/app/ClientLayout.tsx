"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <Toaster richColors />
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <div className="container mx-auto lg:px-10 pt-4">{children}</div>
          </main>
        </SidebarProvider>
        </QueryClientProvider>
    </div>
  );
}
