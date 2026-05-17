"use client";

import { Product } from "@/types/product";
import React from "react";
import Link from "next/link";
import Image from "next/image";
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
      className="group flex flex-col bg-[#1A1A1A] p-4 rounded-[2rem] hover:bg-[#222] transition-all duration-300 cursor-pointer"
    >
      {/* KHỐI HÌNH ẢNH CÓ NỀN SÁNG HOẶC TRUNG TÍNH */}
      <div className="aspect-[4/5] flex items-center justify-center relative mb-4 w-full bg-[#f5f5f5] rounded-[1.5rem] overflow-hidden">
        <div className="relative w-[90%] h-[90%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
          />
        </div>

        {/* Nhãn ưu đãi bo tròn */}
        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider z-10">
          Mới
        </div>
      </div>

      {/* KHỐI NỘI DUNG */}
      <div className="space-y-3 px-2 pb-2">
        <h3 className="text-white text-lg font-semibold tracking-tight line-clamp-1 group-hover:text-[#C9A63F] transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-400 text-xs line-clamp-2">
          {product.description ||
            "Công nghệ đột phá mang đến trải nghiệm tuyệt vời."}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-white font-bold text-lg">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </span>

          <button
            onClick={handleQuickAdd}
            suppressHydrationWarning={true}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white hover:text-black transition-all duration-300 z-30"
          >
            <span className="text-xl font-light">+</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
