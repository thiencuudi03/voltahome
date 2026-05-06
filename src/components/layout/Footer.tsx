"use client";
import React from "react";

export default function Footer() {
  return (
    // Tăng pt-48 (thay vì pt-32) để tạo khoảng cách cực lớn với phần Sản phẩm phía trên
    <footer className="w-full bg-[#050505] pt-48 pb-20 px-6 md:px-20 border-t border-white/5 font-sans">
      <div className="max-w-[1700px] mx-auto">
        {/* Phần nội dung chính của Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 md:gap-32">
          {/* Cột 1: Brand & Slogan */}
          <div className="flex-[1.5] space-y-12">
            <h3 className="text-white text-4xl font-black tracking-tighter uppercase">
              Volt<span className="text-[#C9A63F]">Home</span>
            </h3>
            <p className="text-gray-500 text-xl leading-relaxed max-w-sm italic font-light opacity-70">
              Kiến tạo không gian số đỉnh cao với thiết kế tối giản dành cho thế
              hệ mới.
            </p>
          </div>

          {/* Cột 2: Khám phá */}
          <div className="flex-1 space-y-12">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.6em] opacity-40">
              Khám phá
            </h4>
            <div className="flex flex-col gap-8">
              {["Sản phẩm", "Bộ sưu tập", "Liên hệ"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 text-xl hover:text-[#C9A63F] transition-colors italic w-fit tracking-widest"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Cột 3: Newsletter */}
          <div className="flex-1 w-full max-w-md space-y-12">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.6em] opacity-40">
              Bản tin
            </h4>
            <div className="relative w-full pt-4 group">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="w-full bg-transparent border-b border-white/10 py-5 text-xl text-white outline-none focus:border-[#C9A63F] transition-all placeholder:text-gray-800 font-light"
              />
              <button className="absolute right-0 top-6 text-[#C9A63F] text-3xl hover:text-white transition-all">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Đẩy mt-64 để tạo khoảng trống cực đại cuối trang */}
        <div className="mt-64 pt-10 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-700 uppercase tracking-[0.5em]">
          <p>
            © 2026 <span className="font-bold text-gray-500">VOLTHOME</span>.
            ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-16">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
