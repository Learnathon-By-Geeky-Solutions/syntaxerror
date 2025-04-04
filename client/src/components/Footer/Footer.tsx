"use client";

import {
  Facebook,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Newsletter from "./Newsletter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Meat & Seafood",
    "Bakery",
    "Beverages",
    "Snacks & Sweets",
  ];

  return (
    <div>
      <Newsletter />
      <footer className="bg-gradient-to-b from-white px-4 to-gray-50 border-t">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="text-3xl font-bold tracking-tight">
                i<span className="text-green-600">Krishak</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your trusted partner for fresh, organic produce delivered right
                to your doorstep. We believe in quality, sustainability, and
                healthy living.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-6 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Categories
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-green-600 text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-green-600 transition-colors" />
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-6 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Quick Links
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {[
                  "About Us",
                  "Our Products",
                  "Special Offers",
                  "Testimonials",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-green-600 text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-green-600 transition-colors" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-6 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Contact Info
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-600 hover:text-green-600 text-sm transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mr-3 group-hover:bg-green-600 group-hover:border-green-600 transition-all duration-300">
                      <MapPin className="w-4 h-4 group-hover:text-white transition-colors" />
                    </span>
                    123 Grocery Street, Food City, FC 12345
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center text-gray-600 hover:text-green-600 text-sm transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mr-3 group-hover:bg-green-600 group-hover:border-green-600 transition-all duration-300">
                      <Phone className="w-4 h-4 group-hover:text-white transition-colors" />
                    </span>
                    (123) 456-7890
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@ikrishak.com"
                    className="flex items-center text-gray-600 hover:text-green-600 text-sm transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mr-3 group-hover:bg-green-600 group-hover:border-green-600 transition-all duration-300">
                      <Mail className="w-4 h-4 group-hover:text-white transition-colors" />
                    </span>
                    info@ikrishak.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                © {currentYear}{" "}
                <span className="text-green-600 font-medium">iKrishak</span>.
                All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Privacy Policy
                </Link>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
