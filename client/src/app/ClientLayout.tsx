"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideLayoutRoutes = ["/login", "/register"];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  return (
    <div className="container mx-auto">
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </div>
  );
}