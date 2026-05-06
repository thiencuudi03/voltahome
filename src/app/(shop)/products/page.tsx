"use client";
import React from "react";
import { mockProducts } from "@/data/mockProducts";
import ProductCard from "@/components/product/ProductCard";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-40">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        {/* Header: Giữ kích thước gọn gàng để không lấn át Sidebar */}
        <header className="mb-16 border-b border-white/5 pb-8">
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter">
            CỬA HÀNG <span className="text-[#C9A63F]">TRỰC TUYẾN</span>
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* SIDEBAR: Thêm không gian thở và định dạng lại chữ */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-12">
              {/* Nhóm lọc: Hãng sản xuất */}
              <section className="space-y-6">
                <h3 className="text-[#C9A63F] text-[10px] uppercase tracking-[0.4em] font-bold">
                  Hãng sản xuất
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Apple", "Samsung", "Sony", "Custom"].map((brand) => (
                    <button
                      key={brand}
                      className="py-2 px-3 bg-[#0D0D0D] border border-white/5 text-[9px] text-gray-500 hover:border-[#C9A63F] hover:text-white transition-all rounded-lg uppercase"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </section>

              {/* Nhóm lọc: Mức giá */}
              <section className="space-y-6">
                <h3 className="text-[#C9A63F] text-[10px] uppercase tracking-[0.4em] font-bold">
                  Mức giá
                </h3>
                <div className="space-y-4">
                  {[
                    "Tất cả",
                    "Dưới 10 triệu",
                    "10 - 30 triệu",
                    "Trên 30 triệu",
                  ].map((price) => (
                    <label
                      key={price}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-3 h-3 border border-white/20 rounded-full flex items-center justify-center group-hover:border-[#C9A63F] transition-all">
                        <div className="w-1.5 h-1.5 bg-[#C9A63F] rounded-full opacity-0 group-hover:opacity-100" />
                      </div>
                      <span className="text-[10px] text-gray-500 group-hover:text-white transition-all uppercase tracking-widest">
                        {price}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          {/* KHU VỰC SẢN PHẨM */}
          <div className="flex-1 space-y-12">
            {/* Tab danh mục phụ */}
            <div className="flex flex-wrap gap-3 pb-8">
              {["Tất cả", "Laptop", "Điện thoại", "Phụ kiện"].map((tab) => (
                <button
                  key={tab}
                  className="px-6 py-2 rounded-full border border-white/5 bg-[#0D0D0D] text-[9px] text-gray-500 hover:text-white hover:border-[#C9A63F] transition-all uppercase tracking-[0.2em]"
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid sản phẩm: 3 cột khi có sidebar là tỷ lệ vàng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
