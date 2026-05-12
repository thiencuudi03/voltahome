"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  ShoppingCart,
  CreditCard,
  ShieldCheck,
  Star,
  Truck,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import { mockProducts } from "@/data/mockProducts"; // Đảm bảo đường dẫn này khớp với file data của bạn
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  // Tìm sản phẩm dựa trên ID từ URL
  const product = mockProducts.find((p) => p.id === params.id);

  // Cuộn lên đầu trang khi vào chi tiết
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white space-y-6">
        <h1 className="text-4xl font-black uppercase tracking-widest text-gray-700">
          Không tìm thấy sản phẩm
        </h1>
        <Link
          href="/products"
          className="text-[#C9A63F] border-b border-[#C9A63F] pb-1 uppercase text-sm font-bold"
        >
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);
  const oldPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price * 1.15);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* ĐIỀU HƯỚNG (BREADCRUMB) */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-10">
          <Link href="/" className="hover:text-[#C9A63F]">
            Trang chủ
          </Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-[#C9A63F]">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#C9A63F] truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* TRÁI: HÌNH ẢNH */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 p-12 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-[#C9A63F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]"
              />
            </div>
          </div>

          {/* PHẢI: NỘI DUNG CHI TIẾT (Mẫu chuẩn bạn muốn) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#C9A63F]/10 border border-[#C9A63F]/20 rounded text-[10px] font-bold text-[#C9A63F] uppercase tracking-widest">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-white">
                {product.name}
              </h1>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center text-[#C9A63F] gap-1">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">4.9</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">
                  Đã bán <strong className="text-white ml-1">850+</strong>
                </span>
              </div>
            </div>

            {/* KHỐI GIÁ */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col gap-2">
              <div className="flex items-end gap-4">
                <span className="text-5xl font-bold text-[#C9A63F]">
                  {formattedPrice}
                </span>
                <span className="text-lg text-gray-600 line-through mb-1">
                  {oldPrice}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                Giá đã bao gồm thuế VAT và bảo hành chính hãng
              </p>
            </div>

            {/* ƯU ĐÃI NÉT ĐỨT */}
            <div className="p-4 border border-dashed border-[#C9A63F]/30 bg-[#C9A63F]/5 rounded-xl space-y-2">
              <p className="text-xs font-bold text-[#C9A63F] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C9A63F] rounded-full animate-ping" />{" "}
                Ưu đãi độc quyền
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4 list-disc">
                <li>Giảm ngay 500.000đ khi thanh toán qua thẻ tín dụng</li>
                <li>Tặng kèm bao da cao cấp trị giá 1.200.000đ</li>
              </ul>
            </div>

            {/* SỐ LƯỢNG */}
            <div className="flex items-center gap-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Số lượng
              </span>
              <div className="flex items-center bg-[#0A0A0A] border border-white/10 rounded-full px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-gray-400 hover:text-white"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-gray-400 hover:text-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* NÚT BẤM */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product);
                  alert("Đã thêm vào giỏ hàng!");
                }}
                className="flex-[4] flex items-center justify-center gap-3 border-2 border-[#C9A63F] text-[#C9A63F] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#C9A63F] hover:text-black transition-all"
              >
                <ShoppingCart size={18} /> Thêm vào giỏ
              </button>
              <button className="flex-[6] bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#C9A63F] transition-all shadow-[0_20px_40px_rgba(201,166,63,0.1)]">
                Mua ngay
              </button>
            </div>

            {/* CHÍNH SÁCH */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw size={20} className="text-gray-500" />
                <span className="text-[9px] uppercase font-bold text-gray-600">
                  30 ngày đổi trả
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck size={20} className="text-gray-500" />
                <span className="text-[9px] uppercase font-bold text-gray-600">
                  Bảo hành 2 năm
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={20} className="text-gray-500" />
                <span className="text-[9px] uppercase font-bold text-gray-600">
                  Giao hàng miễn phí
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
