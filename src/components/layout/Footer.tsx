"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, Layers, Send, Mail, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentYear = isMounted ? new Date().getFullYear() : 2026;

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 px-6 md:px-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A63F]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* CỘT 1: THƯƠNG HIỆU */}
          <div className="lg:col-span-5 space-y-8">
            <Link
              href="/"
              className="text-3xl font-black tracking-tighter text-white inline-block"
            >
              VOLT<span className="text-[#C9A63F]">HOME</span>.
            </Link>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm italic">
              "Nơi công nghệ không chỉ là thiết bị, mà là một tác phẩm nghệ
              thuật."
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-gray-600 hover:text-[#C9A63F] transition-all duration-300 hover:-translate-y-1"
              >
                <Globe size={18} />
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-[#C9A63F] transition-all duration-300 hover:-translate-y-1"
              >
                <Layers size={18} />
              </Link>
            </div>
          </div>

          {/* CỘT 2: KHÁM PHÁ - ĐÃ ĐỒNG BỘ TẤT CẢ CHỮ */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#C9A63F]">
              Khám phá
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Sản phẩm", href: "/products" },
                { name: "Ưu đãi", href: "/offers" }, // Đã bỏ 'special'
                { name: "Giới thiệu", href: "/about" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors duration-300 font-light flex items-center gap-2 group"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={10}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: NEWSLETTER */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#C9A63F]">
              Newsletter
            </h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email của bạn"
                suppressHydrationWarning
                className="w-full bg-transparent border-b border-white/10 py-4 text-sm font-light focus:outline-none focus:border-[#C9A63F] transition-colors placeholder:text-gray-700"
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#C9A63F] hover:text-white transition-colors"
                suppressHydrationWarning
              >
                <Send size={16} />
              </button>
            </div>
            <div className="pt-4 space-y-2 text-[10px] text-gray-600 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Mail size={12} /> contact@volthome.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} /> +84 123 456 789
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-700 uppercase tracking-[0.2em]">
          <p>© {currentYear} VOLTHOME. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
