// Trang UI giỏ hàng

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatters";
import { useCartStore } from "@/store/cartStore";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

export default function LuxuryCartPage() {
  // 1. SỬA LỖI CẤU TRÚC HYDRATION CỦA ZUSTAND PERSIST
  const [isMounted, setIsMounted] = useState(false);

  // 2. TẬN DỤNG ĐÚNG CẤU TRÚC STORE BẠN ĐÃ VIẾT
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Tránh lỗi chớp màn hình (FOUC) và lỗi sai lệch DOM giữa Server/Client
  if (!isMounted) {
    return <main className="min-h-screen bg-[#050505]"></main>;
  }

  // Dùng đúng hàm getTotalPrice() từ file store của bạn thay vì tự tính
  const subtotal = getTotalPrice();
  const shipping = items.length > 0 ? 500000 : 0;
  const total = subtotal + shipping;

  // Giao diện khi giỏ hàng trống
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-10">
          <div className="relative inline-block">
            <ShoppingBag
              size={100}
              strokeWidth={1}
              className="text-white/10 mx-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#C9A63F]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter">
              Tuyệt tác đang chờ
            </h2>
            <p className="text-gray-500 font-light italic max-w-xs mx-auto text-sm">
              Giỏ hàng của bạn đang trống. Hãy lấp đầy nó bằng những công nghệ
              đỉnh cao từ bộ sưu tập.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-block px-12 py-4 bg-[#C9A63F] text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-white transition-all duration-500 shadow-lg shadow-[#C9A63F]/10"
          >
            Khám phá ngay
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] py-24 px-6 md:px-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C9A63F]/5 blur-[180px] rounded-full -ml-48 -mt-48 pointer-events-none" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        <div className="mb-20 space-y-6">
          <Link
            href="/products"
            className="group flex items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] hover:text-[#C9A63F] transition-all"
          >
            <ArrowLeft
              size={14}
              className="mr-3 group-hover:-translate-x-2 transition-transform"
            />
            Tiếp tục mua sắm
          </Link>
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            GIỎ <span className="text-[#C9A63F]">HÀNG</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* DANH SÁCH SẢN PHẨM */}
          <div className="lg:col-span-8 space-y-8">
            <div className="hidden md:grid grid-cols-12 pb-6 border-b border-white/5 text-[10px] uppercase tracking-[0.5em] text-gray-600 font-black">
              <div className="col-span-6">Kiệt tác công nghệ</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-3 text-right">Thành tiền</div>
              <div className="col-span-1"></div>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-10 border-b border-white/5 group"
              >
                <div className="col-span-1 md:col-span-6 flex items-center gap-8">
                  <div className="relative w-32 aspect-[4/5] bg-white/[0.03] border border-white/5 rounded-[2rem] overflow-hidden p-4 group-hover:border-[#C9A63F]/30 transition-all duration-500">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#C9A63F] text-[9px] uppercase tracking-[0.5em] font-black opacity-60">
                      {item.category}
                    </p>
                    <h3 className="text-white text-xl font-black uppercase tracking-tight leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 font-serif italic text-sm">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <div className="flex items-center gap-6 bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-full">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="text-gray-500 hover:text-[#C9A63F] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white text-sm font-black w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-[#C9A63F] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3 text-right">
                  <span className="text-white text-xl font-serif italic">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>

                <div className="col-span-1 md:col-span-1 text-right">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-800 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SIDEBAR TÓM TẮT ĐƠN HÀNG */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-[#0A0A0A] border border-white/5 rounded-[4rem] p-12 space-y-12">
              <h2 className="text-white text-2xl font-black uppercase tracking-tighter">
                Tổng kết
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-light uppercase tracking-widest text-[10px]">
                    Tạm tính
                  </span>
                  <span className="text-white font-serif italic">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-light uppercase tracking-widest text-[10px]">
                    Vận chuyển Premium
                  </span>
                  <span className="text-white font-serif italic">
                    {formatCurrency(shipping)}
                  </span>
                </div>
                <div className="h-px bg-white/5 w-full"></div>
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                    Thanh toán
                  </span>
                  <span className="text-[#C9A63F] text-4xl font-serif italic leading-none">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <button className="w-full py-7 bg-[#C9A63F] text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-white transition-all duration-500 shadow-2xl shadow-[#C9A63F]/20">
                  Thanh toán ngay
                </button>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <ShieldCheck size={14} />
                  <span className="text-[8px] uppercase tracking-widest font-bold">
                    Thanh toán bảo mật 256-bit
                  </span>
                </div>
              </div>

              <div className="pt-8 grid grid-cols-2 gap-4 border-t border-white/5 opacity-30">
                <div className="text-center text-[8px] text-white uppercase tracking-tighter font-bold">
                  Chính hãng 100%
                </div>
                <div className="text-center text-[8px] text-white uppercase tracking-tighter font-bold">
                  Vận chuyển toàn cầu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
