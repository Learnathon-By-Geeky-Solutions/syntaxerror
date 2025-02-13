"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Navbar";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideLayoutRoutes = ["/login", "/register", "/resetPassword", "/resetPassword/set-new-password"];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  const queryClient = new QueryClient()

  return (
    <div className="container mx-auto">

      <QueryClientProvider client={queryClient}>
      {!shouldHideLayout && <Navbar />}
      <Toaster richColors  />
      {children}
      {!shouldHideLayout && <Footer />}
      </QueryClientProvider>

    </div>
  );
}