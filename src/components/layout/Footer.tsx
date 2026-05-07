"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 px-6 md:px-20 border-t border-white/5 overflow-hidden">
      {/* Hiệu ứng ánh sáng mờ góc footer */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A63F]/5 blur-[120px] rounded-full -mr-64 -mb-64 pointer-events-none" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Cột 1: Thương hiệu & Slogan (Chiếm 6 cột để không gian rộng rãi) */}
          <div className="lg:col-span-6 space-y-8">
            <Link href="/" className="inline-block">
              <h2 className="text-white text-3xl font-black tracking-tighter">
                VOLT<span className="text-[#C9A63F]">HOME</span>.
              </h2>
            </Link>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md italic">
              "Nơi công nghệ không chỉ là thiết bị, mà là một tác phẩm nghệ
              thuật trong không gian sống của bạn."
            </p>
            <div className="flex gap-6 items-center">
              {["FB", "IG", "TW", "BE"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-600 hover:text-[#C9A63F] text-[10px] font-bold tracking-widest transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Cột 2: Link điều hướng (Chiếm 3 cột) */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <h4 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold">
                Khám phá
              </h4>
              <ul className="space-y-4">
                {["Sản phẩm", "Bộ sưu tập", "Công nghệ", "Ưu đãi"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-white text-sm transition-colors font-light"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* Cột 3: Đăng ký nhận tin - Newsletter (Chiếm 3 cột) */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold">
              Newsletter
            </h4>
            <div className="relative group">
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Email của bạn"
                className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors placeholder:text-gray-700"
              />
              <button
                suppressHydrationWarning
                className="absolute right-0 bottom-3 text-[#C9A63F] text-xs font-bold tracking-widest hover:translate-x-1 transition-transform"
              >
                GỬI →
              </button>
            </div>
            <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-wider">
              Nhận thông tin về các sản phẩm giới hạn sớm nhất.
            </p>
          </div>
        </div>

        {/* Phần Bottom Footer */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-700 text-[10px] uppercase tracking-[0.2em] font-medium">
            © Đỗ Thị Cúc Huệ - 2026
          </p>
          <div className="flex gap-8 items-center text-[10px] uppercase tracking-[0.2em] font-medium text-gray-700">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
