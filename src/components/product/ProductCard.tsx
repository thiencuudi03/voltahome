import { Product } from "@/types/product";
import React from "react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col bg-[#080808] p-6 rounded-[35px] border border-white/5 hover:border-[#C9A63F]/30 transition-all duration-500">
      <div className="aspect-square flex items-center justify-center relative mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-[75%] h-auto object-contain transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge trả góp hoặc khuyến mãi giống ảnh mẫu */}
        <div className="absolute bottom-0 left-0 bg-[#121212] px-3 py-1 rounded-lg text-[9px] text-[#C9A63F] border border-[#C9A63F]/20 uppercase tracking-tighter">
          Trả góp 0%
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-white text-base font-bold uppercase tracking-tight line-clamp-2 min-h-[48px] leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-[#C9A63F] font-serif italic text-lg">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </span>
          <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#C9A63F] hover:border-[#C9A63F] transition-all">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
