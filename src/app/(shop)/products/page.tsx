// Danh mục sản phẩm

"use client";

import React, { useState } from "react";
import { mockProducts } from "@/data/mockProducts";
import ProductCard from "@/components/product/ProductCard";

// Danh mục và mức giá mẫu (Sẽ đồng bộ với DB sau)
const CATEGORIES = [
  "Tất cả",
  "Laptop Premium",
  "Điện thoại",
  "Phụ kiện cao cấp",
  "Thiết bị SmartHome",
];
const PRICE_RANGES = [
  "Tất cả mức giá",
  "Dưới 20 triệu",
  "20 - 40 triệu",
  "40 - 60 triệu",
  "Trên 60 triệu",
];

export default function ModernProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredProducts =
    selectedCategory === "Tất cả"
      ? mockProducts
      : mockProducts.filter((product) => product.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#050505] py-20 px-6 md:px-20 relative z-10 overflow-hidden">
      {/* Hiệu ứng ánh sáng nền mờ */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#C9A63F]/5 blur-[200px] rounded-full -ml-96 -mt-96 pointer-events-none" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        {/* Header Trang: Thiết kế Typo đậm, mạnh mẽ, hiện đại */}
        <div className="mb-20 pb-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-3">
            <p className="text-[#C9A63F] text-xs uppercase tracking-[0.6em] font-bold opacity-60">
              Bộ sưu tập thiết bị
            </p>
            <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              CÔNG NGHỆ <br />
              <span className="text-[#C9A63F]">TỐI GIẢN</span>
            </h1>
          </div>
          <p className="text-gray-500 italic max-w-sm text-sm font-light leading-relaxed">
            Nơi hội tụ những kiệt tác công nghệ, được chọn lọc khắt khe, mang
            lại trải nghiệm sống thượng lưu cho không gian của bạn.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Cột trái: Bộ lọc (Sticky Sidebar) */}
          <aside className="w-full lg:w-1/4 space-y-16 lg:sticky lg:top-32 self-start">
            {/* 1. Tìm kiếm - Hiện đại hơn với Border bo tròn nhẹ */}
            <div className="space-y-6">
              <h3 className="text-white text-[11px] uppercase tracking-[0.4em] font-bold">
                Tìm kiếm sản phẩm
              </h3>
              <div className="relative">
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="MacBook Pro, iPhone 16..."
                  className="w-full bg-[#080808] border border-white/5 rounded-full py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#C9A63F]/50 transition-colors placeholder:text-gray-700"
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700">
                  🔍
                </span>
              </div>
            </div>

            {/* 2. Danh mục - Thiết kế nút bấm tinh tế */}
            <div className="space-y-6">
              <h3 className="text-white text-[11px] uppercase tracking-[0.4em] font-bold">
                Danh mục
              </h3>
              <ul className="space-y-3">
                {CATEGORIES.map((item) => (
                  <li key={item}>
                    <button
                      suppressHydrationWarning
                      onClick={() => setSelectedCategory(item)}
                      className={`text-sm py-2 px-4 rounded-full transition-all duration-300 w-full text-left flex justify-between items-center ${
                        selectedCategory === item
                          ? "bg-[#C9A63F] text-black font-bold"
                          : "text-gray-500 font-light hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item}
                      {selectedCategory === item && (
                        <span className="text-xs">→</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Lọc theo giá - Thiết kế tối giản */}
            <div className="space-y-6">
              <h3 className="text-white text-[11px] uppercase tracking-[0.4em] font-bold">
                Mức giá (VND)
              </h3>
              <ul className="space-y-3 pl-2 border-l border-white/5">
                {PRICE_RANGES.map((item, idx) => (
                  <li key={item}>
                    <button
                      suppressHydrationWarning
                      className={`text-sm py-1.5 transition-colors w-full text-left ${
                        idx === 0
                          ? "text-white font-medium relative before:absolute before:left-[-11px] before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-[#C9A63F] before:rounded-full"
                          : "text-gray-500 font-light hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Cột phải: Lưới sản phẩm - Tăng độ rộng và khoảng cách */}
          <div className="w-full lg:w-3/4 space-y-10">
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-6">
              <p className="text-gray-500 font-light italic">
                Hiển thị {filteredProducts.length} kết quả cho "
                {selectedCategory}"
              </p>
              <select className="bg-transparent text-white text-xs uppercase tracking-widest font-bold focus:outline-none cursor-pointer">
                {/* Đổi bg-black thành className="bg-black" */}
                <option className="bg-black">Mặc định</option>
                <option className="bg-black">Giá thấp - cao</option>
                <option className="bg-black">Giá cao - thấp</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-white/5 rounded-[3rem] bg-[#080808] flex flex-col items-center gap-6">
                <span className="text-6xl">📦</span>
                <p className="text-gray-500 italic max-w-sm leading-relaxed">
                  Rất tiếc, bộ sưu tập của chúng tôi hiện chưa có sản phẩm nào
                  thuộc danh mục "{selectedCategory}" phù hợp với yêu cầu của
                  bạn.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
