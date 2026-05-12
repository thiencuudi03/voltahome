"use client";

import { Product } from "@/types/product";
import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col bg-[#080808] p-6 rounded-[35px] border border-white/5 hover:border-[#C9A63F]/30 transition-all duration-500 cursor-pointer relative"
    >
      <div className="aspect-square flex items-center justify-center relative mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-[75%] h-auto object-contain transition-transform duration-700 group-hover:scale-110"
        />
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

          <button
            onClick={handleQuickAdd}
            // THÊM DÒNG NÀY ĐỂ DIỆT LỖI ĐỎ TRÊN CONSOLE
            suppressHydrationWarning={true}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 hover:bg-[#C9A63F] hover:border-[#C9A63F] hover:text-black transition-all duration-300 z-30"
          >
            <span className="text-xl font-light">+</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
