import { Product } from "@/types/product";
import React from "react";
import Link from "next/link"; // IMPORT THÊM DÒNG NÀY

export default function ProductCard({ product }: { product: Product }) {
  return (
    // BỌC TOÀN BỘ BẰNG LINK ĐỂ CHUYỂN TRANG
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col bg-[#080808] p-6 rounded-[35px] border border-white/5 hover:border-[#C9A63F]/30 transition-all duration-500 cursor-pointer"
    >
      <div className="aspect-square flex items-center justify-center relative mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-[75%] h-auto object-contain transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge trả góp */}
        <div className="absolute bottom-0 left-0 bg-[#121212] px-3 py-1 rounded-lg text-[9px] text-[#C9A63F] border border-[#C9A63F]/20 uppercase tracking-tighter">
          Trả góp 0%
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-white text-base font-bold uppercase tracking-tight line-clamp-2 min-h-[48px] leading-tight group-hover:text-[#C9A63F] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-[#C9A63F] font-serif italic text-lg">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </span>

          {/* Nút dấu + này bạn có thể để nguyên hoặc đổi thành thẻ span nếu không muốn nó nuốt sự kiện click của Link */}
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#C9A63F] group-hover:border-[#C9A63F] transition-all">
            +
          </div>
        </div>
      </div>
    </Link>
  );
}
