"use client";

import React from "react";
import Image from "next/image"; // Nhớ import thêm cái này

export default function AboutSection() {
  return (
    <section className="relative bg-black py-32 px-6 md:px-20 border-t border-white/5 z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Cột trái: Hình ảnh decor - Đã tối ưu bằng Next.js Image */}
          <div className="relative overflow-hidden rounded-3xl group aspect-[4/5] lg:aspect-square">
            <Image
              // Link ảnh phong cách Luxury Tech, tông màu trầm hợp với VoltHome
              src="/images/products/contacts.png"
              alt="VoltHome Premium Space"
              fill // Thay thế cho w-full h-full
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
              // Thuộc tính sizes giúp fix lỗi performance của Next.js
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            {/* Badge Premium */}
            <div className="absolute bottom-8 left-8 bg-[#C9A63F] px-8 py-5 rounded-2xl shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500 z-20">
              <p className="text-black font-black text-3xl italic leading-none tracking-tighter">
                PREMIUM
              </p>
              <p className="text-black text-[10px] uppercase tracking-[0.2em] font-bold mt-2 opacity-80">
                Tiêu chuẩn quốc tế
              </p>
            </div>

            {/* Lớp phủ để ảnh trông sâu hơn */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          </div>

          {/* Cột phải: Nội dung văn bản */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#C9A63F]"></div>
              <span className="text-[#C9A63F] text-[11px] uppercase tracking-[0.5em] font-bold">
                Về chúng tôi
              </span>
            </div>

            <h2 className="text-white text-5xl md:text-7xl font-serif italic mb-10 leading-[1.1]">
              Kiến tạo{" "}
              <span className="text-[#C9A63F] not-italic font-black uppercase tracking-tighter">
                KHÔNG GIAN
              </span>{" "}
              số
            </h2>

            <div className="space-y-8 text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              <p>
                <strong className="text-white font-medium">VoltHome</strong>{" "}
                không chỉ là nơi cung cấp thiết bị điện tử. Chúng tôi là điểm
                giao thoa giữa nghệ thuật sắp đặt và đột phá công nghệ.
              </p>
              <p>
                Mọi sản phẩm trong hệ sinh thái đều được tuyển chọn khắt khe để
                đảm bảo sự hòa hợp tuyệt đối với phong cách sống tối giản và
                hiện đại của bạn.
              </p>
            </div>

            <div className="mt-12">
              <button
                suppressHydrationWarning={true}
                className="px-12 py-5 border-2 border-[#C9A63F] text-[#C9A63F] font-bold text-[13px] uppercase tracking-[0.25em] rounded-full hover:bg-[#C9A63F] hover:text-black transition-all duration-500 active:scale-95"
              >
                TÌM HIỂU THÊM
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
