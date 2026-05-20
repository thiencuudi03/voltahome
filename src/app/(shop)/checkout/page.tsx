"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { createFirebaseOrder } from "@/services/productService";
import { toast } from "sonner";
import {
  ChevronLeft,
  CreditCard,
  Banknote,
  Truck,
  X,
  ShieldCheck,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // 🌟 State mới để bật/tắt Popup nhập thẻ
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && items.length === 0) {
      router.replace("/products");
    }
  }, [isMounted, items.length, router]);

  if (!isMounted || items.length === 0) return null;

  const subtotal = items.reduce(
    (acc, item: any) => acc + item.price * item.quantity,
    0,
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // 🌟 Tách logic xử lý đơn hàng ra một hàm riêng
  const executeOrder = async () => {
    // Tắt popup nếu nó đang mở
    setShowPaymentModal(false);

    const toastId = toast.loading("Đang xử lý đơn hàng...", {
      description: "Hệ thống đang ghi nhận đơn hàng của bạn.",
    });

    const orderPayload = {
      email: user?.email || "guest@volthome.com",
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      items: items,
      totalAmount: subtotal,
      paymentMethod: paymentMethod,
      status: "Chờ xử lý",
      createdAt: new Date().toISOString(),
    };

    const result = await createFirebaseOrder(orderPayload);

    if (result.success) {
      toast.dismiss(toastId);
      toast.success("ĐẶT HÀNG THÀNH CÔNG!", {
        description: `Mã đơn hàng [${result.id?.slice(0, 8)}] đã được ghi nhận.`,
      });

      clearCart();
      router.push("/account");
    } else {
      toast.dismiss(toastId);
      toast.error("GIAO DỊCH THẤT BẠI", {
        description: "Hệ thống bị gián đoạn, vui lòng thử lại.",
      });
    }
  };

  // 🌟 Hàm chặn khi nhấn nút "Xác nhận đặt hàng"
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      // Nếu chọn thẻ, mở Popup giả lập lên
      setShowPaymentModal(true);
    } else {
      // Nếu COD, chạy thẳng hàm đặt hàng
      executeOrder();
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#C9A63F] transition-colors mb-10 text-xs font-bold uppercase tracking-widest"
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
          {/* CỘT TRÁI: FORM ĐIỀN THÔNG TIN */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-widest text-[#C9A63F] border-b border-white/10 pb-4 flex items-center gap-3">
                <Truck size={20} /> Thông tin nhận hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Họ và tên
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập họ tên của bạn"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Số điện thoại
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Địa chỉ giao hàng
                  </label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Ghi chú
                  </label>
                  <textarea
                    rows={3}
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú thêm về đơn hàng..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-widest text-[#C9A63F] border-b border-white/10 pb-4 flex items-center gap-3">
                <CreditCard size={20} /> Phương thức thanh toán
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`cursor-pointer border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${paymentMethod === "cod" ? "border-[#C9A63F] bg-[#C9A63F]/5" : "border-white/10 hover:border-white/30 bg-[#0A0A0A]"}`}
                >
                  <div className="flex items-center justify-between">
                    <Banknote
                      className={
                        paymentMethod === "cod"
                          ? "text-[#C9A63F]"
                          : "text-zinc-500"
                      }
                      size={28}
                    />
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#C9A63F]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">
                      Thanh toán khi nhận hàng
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Tiền mặt hoặc chuyển khoản.
                    </p>
                  </div>
                </label>

                <label
                  className={`cursor-pointer border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${paymentMethod === "card" ? "border-[#C9A63F] bg-[#C9A63F]/5" : "border-white/10 hover:border-white/30 bg-[#0A0A0A]"}`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard
                      className={
                        paymentMethod === "card"
                          ? "text-[#C9A63F]"
                          : "text-zinc-500"
                      }
                      size={28}
                    />
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#C9A63F]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Thẻ Tín Dụng</h3>
                    <p className="text-xs text-zinc-500">
                      Thanh toán bảo mật qua hệ thống.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: BILL TÍNH TIỀN */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 lg:sticky lg:top-32">
              <h2 className="text-xl font-black uppercase tracking-widest mb-8 text-center">
                Đơn hàng của bạn
              </h2>
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-white/5 pb-4"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-xl p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-[10px] text-zinc-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-[#C9A63F]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mb-8 border-b border-white/10 pb-6">
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Tạm tính</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-8">
                <span className="text-xs font-bold uppercase text-zinc-500">
                  Tổng thanh toán
                </span>
                <span className="text-3xl font-serif italic text-[#C9A63F]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-[#C9A63F] text-black py-5 rounded-full font-black uppercase text-xs hover:bg-white transition-all duration-300"
              >
                Xác nhận đặt hàng
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 🌟 MÀN HÌNH POPUP GIẢ LẬP NHẬP THẺ TÍN DỤNG */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0A0A0A] border border-[#C9A63F]/30 rounded-[2rem] p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-300">
            {/* Nút đóng */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-8 text-[#C9A63F]">
              <ShieldCheck size={28} />
              <h3 className="text-xl font-black uppercase tracking-widest">
                Thanh toán thẻ
              </h3>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                  Số thẻ
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-black border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Ngày hết hạn
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-black border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Mã CVV
                  </label>
                  <input
                    type="password"
                    placeholder="***"
                    maxLength={3}
                    className="w-full bg-black border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#C9A63F]"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">
                    Số tiền thanh toán
                  </p>
                  <p className="text-xl font-black text-[#C9A63F]">
                    {formatPrice(subtotal)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={executeOrder} // Bấm xác nhận thì chạy hàm tạo đơn
                  className="bg-[#C9A63F] text-black px-8 py-4 rounded-full font-black uppercase text-xs hover:bg-white transition-all"
                >
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
