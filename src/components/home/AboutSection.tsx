//Giới thiệu về trang chủ
"use client";
import React from "react";

export default function AboutSection() {
  return (
    <section className="bg-black py-20 px-6 md:px-20 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Cột trái: Hình ảnh decor (giống mẫu ảnh bạn gửi) */}
          <div className="relative overflow-hidden rounded-2xl group">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"
              alt="VoltHome Office"
              className="w-full h-[450px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            {/* Badge Premium */}
            <div className="absolute bottom-6 left-6 bg-[#C9A63F] px-6 py-4 rounded-xl shadow-2xl">
              <p className="text-black font-black text-2xl italic leading-none">
                PREMIUM
              </p>
              <p className="text-black text-[9px] uppercase tracking-widest font-bold mt-1">
                Tiêu chuẩn quốc tế
              </p>
            </div>
          </div>

          {/* Cột phải: Nội dung văn bản */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#C9A63F]"></div>
              <span className="text-[#C9A63F] text-[10px] uppercase tracking-[0.4em] font-bold">
                Về chúng tôi
              </span>
            </div>

            <h2 className="text-white text-4xl md:text-6xl font-serif italic mb-8 leading-tight">
              Kiến tạo{" "}
              <span className="text-[#C9A63F] not-italic font-black uppercase">
                KHÔNG GIAN
              </span>{" "}
              số
            </h2>

            <div className="space-y-6 text-gray-400 text-base md:text-lg font-light leading-relaxed">
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

            {/* Nút bấm bo tròn đồng bộ với mẫu bạn muốn */}
            <div className="mt-10">
              <button className="px-10 py-4 border-2 border-[#C9A63F] text-[#C9A63F] font-bold text-[12px] uppercase tracking-[0.2em] rounded-full hover:bg-[#C9A63F] hover:text-black transition-all duration-300 active:scale-95">
                TÌM HIỂU THÊM
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
