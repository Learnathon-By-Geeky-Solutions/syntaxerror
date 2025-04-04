"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";
import AuthProvider from "@/services/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideLayoutRoutes = [
    "/login",
    "/register",
    "/resetPassword",
    "/resetPassword/set-new-password",
  ];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  const queryClient = new QueryClient();

  return (
    <div className="container mx-auto">
      <AuthProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <CartProvider>
              {!shouldHideLayout && <Navbar />}
              <Toaster richColors />
              {children}
              {!shouldHideLayout && <Footer />}
            </CartProvider>
          </QueryClientProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}
