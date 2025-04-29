"use client";

import { Facebook, Instagram, Leaf, MapPin } from "lucide-react";
import Link from "next/link";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <div>
      <Newsletter />
      <footer className="border-t border-zinc-800 bg-[#1c1917]">
        <div className="container mx-auto px-4 py-12">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div className="flex flex-col items-center justify-center md:items-start space-y-4">
              <Link href="/" className="inline-block group">
                <h2 className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  i<span className="text-green-600 group-hover:text-emerald-300">Krishak</span>
                </h2>
              </Link>
              <p className="text-sm text-zinc-400 max-w-xs leading-relaxed text-center md:text-left">
                Your trusted partner for fresh, organic produce delivered right to your doorstep.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-white">
                <Leaf className="w-5 h-5 text-green-600 " />
                Quick Links
              </h3>
              <div className="flex flex-col items-center md:items-start space-y-3">
                <Link 
                  href="/about" 
                  className="text-sm text-zinc-400 hover:text-green-600  hover:underline underline-offset-4 transition-colors"
                >
                  About Us
                </Link>
                <Link 
                  href="/product" 
                  className="text-sm text-zinc-400 hover:text-green-600 hover:underline underline-offset-4 transition-colors"
                >
                  Our Products
                </Link>
                <Link 
                  href="/category" 
                  className="text-sm text-zinc-400 hover:text-green-600 hover:underline underline-offset-4 transition-colors"
                >
                  Categories
                </Link>
                <Link 
                  href="/faqs" 
                  className="text-sm text-zinc-400 hover:text-green-600 hover:underline underline-offset-4 transition-colors"
                >
                  FAQs
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-green-600" />
                Find Us
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed text-center md:text-left">
                123 Grocery Street, Food City
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-green-600 hover:text-emerald-300 transition-all duration-300 hover:scale-110"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-green-600 hover:text-green-500 transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex justify-center items-center pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} <span className="text-green-600"><Link href="https://github.com/Learnathon-By-Geeky-Solutions/syntaxerror">SyntaxError</Link></span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
