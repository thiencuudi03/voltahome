// header
"use client";

import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 text-white">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Volt<span className="text-yellow-500">Home</span>
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex gap-8 text-sm">
          <Link href="/" className="hover:text-yellow-400 transition">
            Trang chủ
          </Link>
          <Link href="/products" className="hover:text-yellow-400 transition">
            Sản phẩm
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition">
            Giới thiệu
          </Link>
          <Link href="/contact" className="hover:text-yellow-400 transition">
            Liên hệ
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Search className="h-5 w-5 cursor-pointer hover:text-yellow-400 transition" />
          <User className="h-5 w-5 cursor-pointer hover:text-yellow-400 transition" />
          <ShoppingCart className="h-5 w-5 cursor-pointer hover:text-yellow-400 transition" />
        </div>
      </div>
    </header>
  );
}
