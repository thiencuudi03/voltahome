"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const { items } = useCartStore();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // Mảng điều hướng tập trung để dễ quản lý
  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Ưu đãi", href: "/offers", special: true }, // Mục đặc biệt
    { name: "Giới thiệu", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isSearchOpen
          ? "bg-[#050505]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 text-white">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter uppercase flex items-center z-50"
        >
          Volt<span className="text-[#C9A63F]">Home</span>
        </Link>

        {/* Menu Desktop */}
        {!isSearchOpen && (
          <nav className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition-colors ${
                  link.special ? "text-[#C9A63F]" : "hover:text-[#C9A63F]"
                }`}
              >
                {link.name}
                {link.special && (
                  <span className="absolute -top-1 -right-2 w-1 h-1 bg-[#C9A63F] rounded-full animate-pulse shadow-[0_0_5px_#C9A63F]" />
                )}
              </Link>
            ))}
          </nav>
        )}

        {/* Search Bar Input */}
        {isSearchOpen && (
          <div className="hidden md:block flex-1 max-w-md mx-8 animate-in fade-in slide-in-from-top-1">
            <form onSubmit={handleSearch} className="relative">
              <input
                autoFocus
                type="text"
                placeholder="Tìm kiếm kiệt tác..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-white focus:outline-none focus:border-[#C9A63F] transition-colors text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <X
                className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-gray-400 hover:text-[#C9A63F] transition-colors"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
              />
            </form>
          </div>
        )}

        {/* Icons Area */}
        <div className="flex items-center gap-5 md:gap-6 z-50">
          <Search
            className={`h-5 w-5 cursor-pointer transition-colors hidden md:block ${isSearchOpen ? "text-[#C9A63F]" : "hover:text-[#C9A63F]"}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />

          <Link href="/login" className="hidden md:block">
            <User className="h-5 w-5 cursor-pointer hover:text-[#C9A63F] transition-colors" />
          </Link>

          <Link href="/cart" className="relative group">
            <ShoppingCart className="h-5 w-5 cursor-pointer group-hover:text-[#C9A63F] transition-colors" />
            {isMounted && totalItems > 0 && (
              <span
                suppressHydrationWarning
                className="absolute -top-2 -right-2 bg-[#C9A63F] text-black text-[10px] font-black h-[18px] w-[18px] flex items-center justify-center rounded-full"
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* Nút Hamburger Mobile */}
          <button
            className="md:hidden text-white hover:text-[#C9A63F] transition-colors ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-[#050505] z-40 flex flex-col pt-32 px-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSearch} className="relative mb-12">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white focus:outline-none focus:border-[#C9A63F] transition-colors text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <Search size={18} />
          </button>
        </form>

        <nav className="flex flex-col gap-8 text-3xl font-black uppercase tracking-tighter">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`transition-colors ${
                link.special ? "text-[#C9A63F]" : "hover:text-[#C9A63F]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pb-12 flex flex-col gap-6">
          <div className="h-px w-full bg-white/10" />
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between text-gray-400 hover:text-white transition-colors uppercase text-sm font-bold tracking-widest"
          >
            <span className="flex items-center gap-3">
              <User size={18} /> Tài khoản VIP
            </span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
