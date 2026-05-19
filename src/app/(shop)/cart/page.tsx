"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

// 🌟 THAY VÌ VIẾT LẠI LOGIC THẢ TIM BẰNG TAY, TỤI MÌNH DÙNG COMPONENT ĐÃ CODE SẴN
import FavoriteButton from "@/components/product/FavoriteButton";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Hàm tăng số lượng kèm thông báo
  const handleIncrease = (
    id: string,
    currentQuantity: number,
    name: string,
  ) => {
    updateQuantity(id, currentQuantity + 1);
    toast.success(`Đã tăng số lượng: ${name}`, { duration: 1500 });
  };

  // Hàm giảm số lượng kèm thông báo
  const handleDecrease = (
    id: string,
    currentQuantity: number,
    name: string,
  ) => {
    updateQuantity(id, currentQuantity - 1);
    toast.info(`Đã giảm số lượng: ${name}`, { duration: 1500 });
  };

  // Hàm xóa món hàng kèm thông báo
  const handleRemove = (id: string) => {
    removeItem(id);
    toast.error("Đã xóa sản phẩm khỏi giỏ hàng", { duration: 2000 });
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white space-y-6 pt-20">
        <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center text-[#C9A63F] mb-4">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-widest text-gray-400">
          Giỏ hàng trống
        </h1>
        <p className="text-gray-500 font-light">
          Hãy chọn cho mình những kiệt tác công nghệ đẳng cấp.
        </p>
        <Link
          href="/products"
          className="mt-4 flex items-center gap-3 bg-[#C9A63F] text-black px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300"
        >
          Tiếp tục mua sắm <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A63F]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
          Giỏ hàng <span className="text-[#C9A63F]">của bạn</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-white/10 transition-colors"
                >
                  {/* 1. NHẤN VÀO ẢNH ĐỂ XEM CHI TIẾT */}
                  <Link
                    href={`/products/${item.id}`}
                    className="w-full sm:w-32 h-32 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden p-2 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

                  {/* 2. THÔNG TIN SẢN PHẨM */}
                  <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                    <p className="text-[#C9A63F] text-[10px] font-bold uppercase tracking-widest">
                      {item.category}
                    </p>
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-lg font-bold line-clamp-1 hover:text-[#C9A63F] transition-colors cursor-pointer">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xl font-serif italic text-white/80">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* BỘ ĐIỀU KHIỂN & CHỨC NĂNG */}
                  <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    {/* KHỐI NÚT CHỨC NĂNG (TIM & XÓA) */}
                    <div className="flex items-center gap-2">
                      {/* 🌟 NÚT TIM AN TOÀN ĐƯỢC ĐỒNG BỘ DATA VỚI CLOUD */}
                      <FavoriteButton product={item as any} />

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-600 hover:text-red-500 border border-transparent hover:border-red-500/20 bg-transparent hover:bg-red-500/10 rounded-full transition-all p-2 sm:p-3"
                        title="Xóa sản phẩm này"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* KHỐI CHỈNH SỐ LƯỢNG */}
                    <div className="flex items-center border border-white/10 rounded-full bg-white/5">
                      <button
                        onClick={() =>
                          handleDecrease(item.id, item.quantity, item.name)
                        }
                        disabled={item.quantity <= 1}
                        className="p-3 hover:text-[#C9A63F] disabled:opacity-30 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrease(item.id, item.quantity, item.name)
                        }
                        className="p-3 hover:text-[#C9A63F] transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4 bg-[#0A0A0A] border border-[#C9A63F]/20 rounded-[2.5rem] p-8 shadow-2xl sticky top-32">
            <h2 className="text-xl font-black uppercase tracking-widest mb-6 text-center">
              Đơn hàng
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Tạm tính</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Vận chuyển</span>
                <span className="text-green-400 font-bold uppercase text-[10px]">
                  Miễn phí
                </span>
              </div>
              <div className="h-px w-full bg-white/10 my-4"></div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Tổng cộng
                </span>
                <span className="text-2xl font-serif italic text-[#C9A63F]">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-3 bg-[#C9A63F] text-black py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300"
            >
              Thanh toán ngay <ArrowRight size={16} />
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">
              <ShieldCheck size={14} /> Bảo mật thanh toán bởi VoltHome
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
