"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useDebounce } from "@/hooks/useDebounce";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const { totalItems } = useCart();
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isSearchOpen
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 text-white">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide flex items-center"
        >
          Volt<span className="text-yellow-500">Home</span>
        </Link>

        {/* Menu - Hiện khi không tìm kiếm */}
        {!isSearchOpen && (
          <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              Trang chủ
            </Link>
            <Link
              href="/products"
              className="hover:text-yellow-400 transition-colors"
            >
              Sản phẩm
            </Link>
            <Link
              href="/about"
              className="hover:text-yellow-400 transition-colors"
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              className="hover:text-yellow-400 transition-colors"
            >
              Liên hệ
            </Link>
          </nav>
        )}

        {/* Search Bar Input */}
        {isSearchOpen && (
          <div className="flex-1 max-w-md mx-8 animate-in fade-in slide-in-from-top-1">
            <div className="relative">
              <input
                autoFocus
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-4 text-white focus:outline-none focus:border-yellow-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <X
                className="absolute right-3 top-2.5 h-4 w-4 cursor-pointer text-gray-400 hover:text-white"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
              />
            </div>
          </div>
        )}

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Search
            className={`h-5 w-5 cursor-pointer transition-colors ${isSearchOpen ? "text-yellow-500" : "hover:text-yellow-400"}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />

          <Link href="/account">
            <User className="h-5 w-5 cursor-pointer hover:text-yellow-400 transition-colors" />
          </Link>

          <Link href="/cart" className="relative group">
            <ShoppingCart className="h-5 w-5 cursor-pointer group-hover:text-yellow-400 transition-colors" />
            {/* Badge chỉ render khi đã mounted */}
            {isMounted && totalItems > 0 && (
              <span
                suppressHydrationWarning
                className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-black"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
