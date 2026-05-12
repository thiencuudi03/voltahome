"use client";

import React from "react";
import Link from "next/link"; // Đã thêm thư viện Link

export default function Hero() {
  return (
    // THÊM: relative z-10 để tách lớp hoàn toàn với các Section bên dưới
    <section className="relative z-10 flex min-h-[calc(100vh-80px)] w-full items-center overflow-hidden bg-[#050505] font-sans">
      {/* Background Layer - z-0 để nằm dưới cùng */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
          alt=""
          className="h-full w-full object-cover opacity-20 grayscale"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
      </div>

      {/* Main Content Area - z-10 */}
      <div className="relative z-10 container mx-auto px-6 md:px-20 py-20">
        <div className="max-w-3xl">
          {/* Title Section */}
          <div className="relative mb-12">
            {/* Chữ TECH nền - z-0 */}
            <span className="pointer-events-none absolute -top-20 left-0 select-none text-[100px] font-black tracking-tight text-white/[0.03] md:text-[180px] z-0">
              TECH
            </span>

            <h1 className="relative z-10 leading-[1.1] text-white">
              <span className="block text-4xl font-serif italic tracking-tight text-white/95 md:text-6xl">
                CÔNG NGHỆ
              </span>
              <span className="mt-4 block text-[50px] font-black uppercase tracking-[0.05em] md:text-8xl">
                ĐỈNH CAO
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="mb-16">
            <p className="max-w-xl border-l-2 border-[#C9A63F]/40 pl-5 text-base leading-loose text-gray-300 md:text-lg italic font-light">
              Trải nghiệm thiết bị điện tử hiện đại với thiết kế tối giản dành
              cho thế hệ mới tại VoltHome.
            </p>
          </div>

          {/* Buttons - Đã chuyển thành thẻ Link */}
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Link
              href="/products"
              suppressHydrationWarning={true}
              className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-5 bg-[#C9A63F] text-black font-black text-[13px] uppercase tracking-[0.15em] rounded-full hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(201,166,63,0.3)] hover:scale-105 active:scale-95 group text-center"
            >
              MUA NGAY
              <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-lg">
                →
              </span>
            </Link>

            <Link
              href="/about"
              suppressHydrationWarning={true}
              className="w-full sm:w-auto px-12 py-5 border-2 border-[#C9A63F] text-white font-bold text-[13px] uppercase tracking-[0.15em] rounded-full hover:bg-[#C9A63F] hover:text-black transition-all duration-300 active:scale-95 text-center"
            >
              GIỚI THIỆU
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
