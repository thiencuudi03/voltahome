"use client";

import React from "react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative bg-[#050505] py-32 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* CỘT TRÁI: Ảnh + Khung phụ (Layering) */}
          <div className="lg:col-span-5 relative">
            {/* Khung viền phụ tạo chiều sâu (Luxury Detail) */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-[#C9A63F]/30 rounded-3xl -z-10" />

            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/products/contacts.png"
                alt="VoltHome Luxury"
                fill
                className="object-cover transition-transform duration-[2s] hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* CỘT PHẢI: Nội dung + Feature List (Logic bán hàng giống FPT) */}
          <div className="lg:col-span-7 flex flex-col pt-4">
            <h2 className="text-white text-5xl md:text-8xl font-serif italic leading-[0.9] tracking-tighter">
              Sống <br />
              <span className="text-[#C9A63F] font-black not-italic uppercase tracking-normal font-sans">
                tinh tế
              </span>
            </h2>

            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-12">
              VoltHome không chỉ bán thiết bị điện tử. Chúng tôi định nghĩa lại
              không gian sống qua lăng kính của sự tối giản và đột phá.
            </p>

            {/* FPT Shop Style: Danh sách lợi ích (Conversion Power) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "Công nghệ tiên phong",
                  desc: "Luôn dẫn đầu xu hướng mới nhất.",
                },
                {
                  title: "Dịch vụ đẳng cấp",
                  desc: "Hỗ trợ 24/7, tận tâm tuyệt đối.",
                },
                {
                  title: "Bảo hành 5 năm",
                  desc: "An tâm tuyệt đối với trải nghiệm.",
                },
                {
                  title: "Thiết kế chuẩn mực",
                  desc: "Tinh gọn, sang trọng, đẳng cấp.",
                },
              ].map((item, idx) => (
                <div key={idx} className="border-l border-[#C9A63F]/50 pl-6">
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-2">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <button className="group relative px-10 py-4 bg-[#C9A63F] text-black font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-white active:scale-95">
                Xem toàn bộ cam kết
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
