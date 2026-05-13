"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
      setScrolled(window.scrollY > 20);
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
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Ưu đãi", href: "/offers", special: true },
    { name: "Giới thiệu", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || isSearchOpen
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-6 md:px-10 text-white transition-all duration-500">
        {/* LOGO VOLTHOME - PHƯƠNG ÁN B (VECTOR SVG) */}
        <Link href="/" className="flex items-center z-50 group gap-3">
          {/* Biểu tượng Logo B */}
          <svg
            width="38"
            height="38"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform group-hover:scale-105 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(201,166,63,0.4)]"
          >
            {/* Hình ngôi nhà (Màu Bạc/Trắng) */}
            <path
              d="M10 32 V18 L20 10 L30 18 V32 H10 Z"
              stroke="#E5E7EB"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Cửa/Lỗ hổng cho mũi tên xuyên qua */}
            <path
              d="M16 32 V22 H24 V32"
              fill="#050505"
              stroke="#E5E7EB"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Mũi tên năng lượng (Màu Vàng Gold) */}
            <path
              d="M20 28 V4 M12 12 L20 4 L28 12"
              stroke="#C9A63F"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Chữ Logo */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-[0.15em] text-white">
              VOLT<span className="text-[#C9A63F]">HOME</span>
            </span>
            <span className="text-[6px] md:text-[7px] text-gray-400 tracking-[0.3em] font-bold mt-0.5 uppercase">
              The Art of Energy
            </span>
          </div>
        </Link>

        {/* Menu Desktop */}
        {!isSearchOpen && (
          <nav className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.25em]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group py-2 transition-colors duration-300 ${
                  link.special
                    ? "text-[#C9A63F]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                {!link.special && (
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A63F] transition-all duration-500 ease-out group-hover:w-full" />
                )}
                {link.special && (
                  <span className="absolute top-1 -right-3 w-1.5 h-1.5 bg-[#C9A63F] rounded-full animate-pulse shadow-[0_0_10px_#C9A63F]" />
                )}
              </Link>
            ))}
          </nav>
        )}

        {/* Search Bar Input (Desktop) */}
        {isSearchOpen && (
          <div className="hidden md:block flex-1 max-w-xl mx-12 animate-in fade-in slide-in-from-top-2 duration-500">
            <form onSubmit={handleSearch} className="relative group">
              <input
                autoFocus
                type="text"
                placeholder="Tìm kiếm tuyệt tác công nghệ..."
                className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-full py-3.5 px-8 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C9A63F]/50 focus:bg-[#0A0A0A] focus:shadow-[0_0_20px_rgba(201,166,63,0.1)] transition-all duration-300 text-sm font-light italic"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <X
                className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-gray-500 hover:text-[#C9A63F] transition-colors hover:scale-110 duration-300"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
              />
            </form>
          </div>
        )}

        {/* Icons Area */}
        <div className="flex items-center gap-6 md:gap-8 z-50 text-gray-300">
          <Search
            strokeWidth={1.5}
            className={`h-5 w-5 cursor-pointer transition-all duration-300 hidden md:block hover:scale-110 ${isSearchOpen ? "text-[#C9A63F]" : "hover:text-[#C9A63F]"}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />

          <Link
            href="/login"
            className="hidden md:block hover:scale-110 transition-transform duration-300"
          >
            <User
              strokeWidth={1.5}
              className="h-5 w-5 cursor-pointer hover:text-[#C9A63F] transition-colors"
            />
          </Link>

          <Link
            href="/cart"
            className="relative group hover:scale-110 transition-transform duration-300"
          >
            <ShoppingCart
              strokeWidth={1.5}
              className="h-5 w-5 cursor-pointer group-hover:text-[#C9A63F] transition-colors"
            />
            {isMounted && totalItems > 0 && (
              <span
                suppressHydrationWarning
                className="absolute -top-2.5 -right-2.5 bg-[#C9A63F] text-black text-[9px] font-black h-[18px] w-[18px] flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(201,166,63,0.4)]"
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* Nút Hamburger Mobile */}
          <button
            className="md:hidden text-white hover:text-[#C9A63F] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X strokeWidth={1.5} size={28} />
            ) : (
              <Menu strokeWidth={1.5} size={28} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-2xl z-40 flex flex-col pt-32 px-8 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSearch} className="relative mb-12">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#C9A63F]/50 transition-colors text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C9A63F]"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
        </form>

        <nav className="flex flex-col gap-8 text-3xl font-black uppercase tracking-tighter">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`transition-all duration-300 hover:translate-x-4 ${
                link.special
                  ? "text-[#C9A63F]"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pb-12 flex flex-col gap-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between text-gray-400 hover:text-[#C9A63F] transition-colors uppercase text-xs font-bold tracking-[0.2em]"
          >
            <span className="flex items-center gap-4">
              <User size={20} strokeWidth={1.5} /> Tài khoản VIP
            </span>
            <span className="text-lg">&rarr;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
