"use client";

import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const navLinks = [
    { name: "home", label: "Home", link: "/"},
    { name: "products", label: "Products", link: "/product" },
    { name: "categories", label: "Categories" , link: "/category"},
    { name: "about", label: "About" , link: "/about"},
  ];

  const router = useRouter();
  const handleLogin = ()=>{
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
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
            <input
              type="text"
              placeholder="Search groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Navigation & Login */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.link}
                onClick={() => setActiveLink(link.name)}
                className={`
                  relative text-gray-700 
                  ${
                    activeLink === link.name
                      ? "text-green-600 font-semibold"
                      : "hover:text-green-600"
                  }
                `}
              >
                {link.label}
                {activeLink === link.name && (
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-green-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <button className="text-gray-700 hover:text-green-600">
              <ShoppingCart size={24} />
            </button>

            <Button onClick={handleLogin} className="bg-green-500 rounded-full text-white flex items-center">
              <User className="" size={20} />
            </Button>
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
              <input
                type="text"
                placeholder="Search groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.link}
                onClick={() => setActiveLink(link.name)}
                className={`
                  block py-2 px-4 
                  ${
                    activeLink === link.name
                      ? "text-green-600 font-semibold bg-green-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  rounded-lg
                `}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
