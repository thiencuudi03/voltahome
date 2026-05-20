"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  User as UserIcon,
  Heart,
  Package,
  Trash2,
  LogOut,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import { getFirebaseOrdersByEmail } from "@/services/productService";
import { toast } from "sonner";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, wishlist, toggleWishlist } = useAuthStore();
  const { addItem } = useCartStore();

  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mấu chốt chặn lỗi văng trang:
  useEffect(() => {
    // Nếu chưa đăng nhập, đá về trang login, KHÔNG PHẢI /products
    if (!isLoading && !user) {
      router.push("/login");
      return;
    }

    if (!user) return;

    const loadWishlist = async () => {
      if (!wishlist.length) return;
      setIsLoadingProducts(true);
      const productPromises = wishlist.map(async (id) => {
        const snap = await getDoc(doc(db, "products", id));
        return snap.exists()
          ? ({ id: snap.id, ...snap.data() } as Product)
          : null;
      });
      const results = await Promise.all(productPromises);
      setSavedProducts(results.filter((p): p is Product => p !== null));
      setIsLoadingProducts(false);
    };

    const loadOrders = async () => {
      if (!user?.email) return;
      setIsLoadingOrders(true);
      const orders = await getFirebaseOrdersByEmail(user.email);
      setUserOrders(orders);
      setIsLoadingOrders(false);
    };

    loadWishlist();
    loadOrders();
  }, [user, wishlist, isLoading, router]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#C9A63F] animate-pulse">
        ĐANG KẾT NỐI...
      </div>
    );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-40 pb-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* PROFILE HEADER */}
        <section className="relative overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-8 md:p-12 mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A63F]/5 blur-[120px] rounded-full" />
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-8">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A63F]/20 to-transparent border border-[#C9A63F]/30 flex items-center justify-center">
                <UserIcon size={40} className="text-[#C9A63F]" />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-1">
                  {user?.displayName || "Quý khách hàng"}
                </h1>
                <p className="text-zinc-500 font-light">{user?.email}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-[#C9A63F]/10 border border-[#C9A63F]/30 text-[#C9A63F] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12} /> Thành viên
                  </span>
                </div>
              </div>
            </div>

            <button
              disabled={isLoggingOut}
              onClick={async () => {
                setIsLoggingOut(true);
                try {
                  await signOut(auth);
                  router.push("/login");
                } catch (error) {
                  console.error("Lỗi đăng xuất:", error);
                  setIsLoggingOut(false);
                }
              }}
              className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                isLoggingOut
                  ? "text-zinc-700 cursor-wait"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              <LogOut
                size={16}
                className={isLoggingOut ? "animate-spin" : ""}
              />
              {isLoggingOut ? "ĐANG XUẤT..." : "ĐĂNG XUẤT"}
            </button>
          </div>
        </section>

        {/* DASHBOARD GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ĐƠN HÀNG */}
          <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-[#C9A63F]">
              <Package size={16} /> Đơn hàng gần nhất
            </h2>

            {userOrders.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                <p className="text-zinc-600 text-sm italic">
                  Chưa có lịch sử giao dịch.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="group bg-white/5 border border-white/5 rounded-3xl p-6 hover:border-[#C9A63F]/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                          Mã ĐH: #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-1">
                          Ngày đặt:{" "}
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "vi-VN",
                              )
                            : "Vừa xong"}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-[#C9A63F]/10 px-3 py-1.5 rounded-lg text-[#C9A63F] border border-[#C9A63F]/20">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {order.items?.map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-black rounded-xl p-2 flex-shrink-0 border border-white/5">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate text-white">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">
                              Số lượng: x{item.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-[#C9A63F]">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-end border-t border-white/5 pt-4 mt-4">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                        Tổng thanh toán
                      </span>
                      <span className="text-xl font-black text-[#C9A63F]">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* WISHLIST (Sản phẩm lưu) */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-red-500">
              <Heart size={16} fill="currentColor" /> Yêu thích
            </h2>
            <div className="space-y-4">
              {savedProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-4 group">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 rounded-xl bg-white/5 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{p.name}</p>
                    <p className="text-[#C9A63F] text-[10px] font-black">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addItem({ ...p, quantity: 1 } as any);
                      router.push("/cart");
                    }}
                    className="text-zinc-600 hover:text-[#C9A63F] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await toggleWishlist(p.id);
                      if (typeof toast !== "undefined")
                        toast.info("Đã xóa khỏi yêu thích");
                    }}
                    className="text-zinc-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
