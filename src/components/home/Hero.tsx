// ảnh header
"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050505] font-sans">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
          alt="Tech Interface"
          className="h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 container mx-auto px-6 md:px-20">
        <div className="max-w-3xl">
          {/* Hero Title Section */}
          <div className="relative mb-12">
            <span className="pointer-events-none absolute -top-10 left-0 select-none text-[100px] font-black tracking-tight text-white/[0.04] md:text-[180px]">
              TECH
            </span>

            <h1 className="relative z-10 leading-none text-white">
              <span className="block text-4xl font-serif italic tracking-tight text-white/95 md:text-6xl">
                CÔNG NGHỆ
              </span>
              <span className="mt-2 block text-[50px] font-black uppercase tracking-[0.05em] md:text-8xl">
                ĐỈNH CAO
              </span>
            </h1>
          </div>

          {/* Description - Sử dụng mb-16 để tách biệt hoàn toàn với nút bấm */}
          <div className="mb-16">
            <p className="max-w-xl border-l-2 border-[#C9A63F]/40 pl-5 text-base leading-relaxed text-gray-300 md:text-lg italic">
              Trải nghiệm thiết bị điện tử hiện đại với thiết kế tối giản dành
              cho thế hệ mới tại VoltHome.
            </p>
          </div>

          {/* NÚT BẤM THIẾT KẾ THEO MẪU (Rounded Capsule) */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Nút Vàng - Khám phá Menu */}
            <button className="flex items-center gap-4 px-12 py-5 bg-[#C9A63F] text-black font-black text-[13px] uppercase tracking-[0.15em] rounded-full hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(201,166,63,0.3)] hover:scale-105 active:scale-95 group">
              MUA NGAY
              <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-lg">
                →
              </span>
            </button>

            {/* Nút Viền - Đặt bàn ngay */}
            <button className="px-12 py-5 border-2 border-[#C9A63F] text-white font-bold text-[13px] uppercase tracking-[0.15em] rounded-full hover:bg-[#C9A63F] hover:text-black transition-all duration-300 active:scale-95">
              DANH MỤC SẢN PHẨM
            </button>
          </div>
        </div>
      </div>

      {/* Side Decoration Line */}
      <div className="absolute bottom-10 left-10 hidden md:block opacity-30">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-px bg-gradient-to-b from-[#C9A63F] to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#C9A63F] [writing-mode:vertical-lr]">
            VOLTHOME
          </span>
        </div>
      </div>
    </section>
  );
}
