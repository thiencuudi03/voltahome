"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import {
  ChevronLeft,
  CreditCard,
  Banknote,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { items, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' hoặc 'card'

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- ĐÃ SỬA LỖI Ở ĐÂY ---
  // Chuyển logic đẩy trang (router.replace) vào bên trong useEffect
  useEffect(() => {
    if (isMounted && items.length === 0) {
      router.replace("/products");
    }
  }, [isMounted, items.length, router]);

  if (!isMounted) return null;

  // Nếu giỏ hàng trống, return null để chờ useEffect bên trên đẩy về trang products
  if (items.length === 0) {
    return null;
  }
  // -------------------------

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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("Đang xử lý đơn hàng...", {
      description: "Hệ thống đang mã hóa thông tin của bạn.",
    });

    // Giả lập call API xử lý thanh toán mất 2 giây
    setTimeout(() => {
      toast.dismiss();
      toast.success("ĐẶT HÀNG THÀNH CÔNG!", {
        description:
          "Mã đơn hàng của bạn đã được gửi qua Email. Cảm ơn quý khách!",
      });
      clearCart();
      router.push("/"); // Trở về trang chủ
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Nút quay lại */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#C9A63F] transition-colors mb-10 text-xs font-bold uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Quay lại giỏ hàng
        </Link>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
          Thanh toán <span className="text-[#C9A63F]">bảo mật</span>
        </h1>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
        >
          {/* CỘT TRÁI: FORM THÔNG TIN & PHƯƠNG THỨC THANH TOÁN */}
          <div className="lg:col-span-7 space-y-12">
            {/* 1. Thông tin giao hàng */}
            <div className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-widest text-[#C9A63F] border-b border-white/10 pb-4 flex items-center gap-3">
                <Truck size={20} /> Thông tin nhận hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Họ và tên
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Nhập họ tên của bạn"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Số điện thoại
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Địa chỉ giao hàng
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, thành phố"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Ghi chú (Tùy chọn)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ghi chú thêm về đơn hàng..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Phương thức thanh toán */}
            <div className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-widest text-[#C9A63F] border-b border-white/10 pb-4 flex items-center gap-3">
                <CreditCard size={20} /> Phương thức thanh toán
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Lựa chọn 1: Thanh toán khi nhận hàng */}
                <label
                  className={`cursor-pointer border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden ${paymentMethod === "cod" ? "border-[#C9A63F] bg-[#C9A63F]/5" : "border-white/10 hover:border-white/30 bg-[#0A0A0A]"}`}
                >
                  <div className="flex items-center justify-between z-10">
                    <Banknote
                      className={
                        paymentMethod === "cod"
                          ? "text-[#C9A63F]"
                          : "text-gray-500"
                      }
                      size={28}
                    />
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#C9A63F] w-4 h-4 cursor-pointer"
                    />
                  </div>
                  <div className="z-10">
                    <h3 className="font-bold text-sm mb-1">
                      Thanh toán khi nhận hàng
                    </h3>
                    <p className="text-xs text-gray-500">
                      Tiền mặt hoặc chuyển khoản khi Shipper giao đến.
                    </p>
                  </div>
                </label>

                {/* Lựa chọn 2: Thẻ tín dụng/Ghi nợ */}
                <label
                  className={`cursor-pointer border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden ${paymentMethod === "card" ? "border-[#C9A63F] bg-[#C9A63F]/5" : "border-white/10 hover:border-white/30 bg-[#0A0A0A]"}`}
                >
                  <div className="flex items-center justify-between z-10">
                    <CreditCard
                      className={
                        paymentMethod === "card"
                          ? "text-[#C9A63F]"
                          : "text-gray-500"
                      }
                      size={28}
                    />
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#C9A63F] w-4 h-4 cursor-pointer"
                    />
                  </div>
                  <div className="z-10">
                    <h3 className="font-bold text-sm mb-1">
                      Thẻ Tín Dụng / Ghi Nợ
                    </h3>
                    <p className="text-xs text-gray-500">
                      Thanh toán bảo mật qua cổng quốc tế Stripe.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: CHI TIẾT ĐƠN HÀNG */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 lg:sticky lg:top-32 shadow-2xl">
              <h2 className="text-xl font-black uppercase tracking-widest mb-8 text-center">
                Đơn hàng của bạn
              </h2>

              {/* Danh sách món */}
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-white/5 pb-4"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-xl p-2 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-[#C9A63F]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tính tiền */}
              <div className="space-y-4 mb-8 border-b border-white/10 pb-6">
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
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Tổng thanh toán
                </span>
                <span className="text-3xl font-serif italic text-[#C9A63F]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Submit Form Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#C9A63F] text-black py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300"
              >
                Xác nhận đặt hàng
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                <ShieldCheck size={14} /> Mã hóa bảo mật SSL 256-bit
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
