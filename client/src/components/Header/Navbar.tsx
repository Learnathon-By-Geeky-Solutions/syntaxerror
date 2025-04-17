"use client";

import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { Menu, Search, User, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Cart from "../Cart/Cart";
import { ProfileDropdown } from "../Profile/ProfileDropdown";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const router = useRouter();
  const { user } = useUser();

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set("search", searchQuery); // Add the search query to the URL
    } else {
      params.delete("search"); // If no search, remove the search query
    }
    router.push(`/product?${params.toString()}`); // Update the URL
  };

  const handleLogout = async() => {
    console.log("Logout clicked");
    try {
      if (user?.provider === "google") {
        await signOut({ callbackUrl: "/login" }); 
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
          {},
          { withCredentials: true }
        );
        // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login"); 
      }
      toast.success("Logout successful");
    } catch (error) {
      console.log(error)
      toast.error("Logout failed:");
    }
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    if(!user){
      router.push("/login");
    } 
    router.push("/profile"); 
  };

  const handleOrdersClick = () => {
    console.log("Orders clicked");
    
    if(!user){
      router.push("/login");
    } 
    router.push("/order");
  };

  const handlePasswordClick = () => {
    console.log("Change password clicked");
    
    if(!user){
      router.push("/login");
    } 
    router.push("/change-password");
  };

  const handleEditProfileClick = () => {
    console.log("Edit profile clicked");
    if(!user){
      router.push("/login");
    } 
    router.push("/edit-profile");
  }

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto">
      <div className="mx-auto py-3 flex items-center justify-between">
        <div className="flex items-center justify-start gap-4 pl-2">
          {/* Mobile Hamburger - Left Side */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold">
            <Link href="/">
              i<span className="text-green-600">Krishak</span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 relative hidden md:block md:ml-10">
          <div className="flex items-center max-w-3xl">
            <Search className="absolute left-3 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Trigger search on enter
              className="w-full pl-10 pr-4 py-2 border focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Navigation & Login */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 mr-4 text-sm">
            {[
              { name: "home", label: "Home", link: "/" },
              { name: "products", label: "Products", link: "/product" },
              { name: "categories", label: "Categories", link: "/category" },
              { name: "about", label: "About", link: "/about" },
              { name: "faqs", label: "FAQs", link: "/faqs" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.link}
                onClick={() => setActiveLink(link.name)}
                className={`relative text-gray-700 ${
                  activeLink === link.name
                    ? "text-green-600 font-semibold"
                    : "hover:text-green-600"
                }`}
              >
                {link.label}
                {activeLink === link.name && (
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-green-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3 pr-2">
            <Cart />
            {user ? (
              <ProfileDropdown
                userImage={user.image ?? undefined}
                userName={user.name}
                onLogout={handleLogout}
                onProfileClick={handleProfileClick}
                onOrdersClick={handleOrdersClick}
                onPasswordClick={handlePasswordClick}
                onEditProfileClick={handleEditProfileClick}
              />
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="bg-green-500 rounded-full text-white flex items-center"
              >
                <User size={20} />
              </Button>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          {/* Mobile Search */}
          <div className="px-4 py-3 block md:hidden">
            <div className="flex items-center">
              <Search className="absolute left-8 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Trigger search on enter
                className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="px-4 pt-2 pb-4 space-y-2 text-sm">
            {[
              { name: "home", label: "Home", link: "/" },
              { name: "products", label: "Products", link: "/product" },
              { name: "categories", label: "Categories", link: "/category" },
              { name: "about", label: "About", link: "/about" },
              { name: "faqs", label: "FAQs", link: "/faqs" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.link}
                onClick={() => setActiveLink(link.name)}
                className={`block py-2 px-3 ${
                  activeLink === link.name
                    ? "text-white font-semibold bg-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                } rounded-lg`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
