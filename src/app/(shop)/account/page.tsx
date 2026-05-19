"use client";

import React, { useState, useEffect } from "react";
// 1. Sửa dòng này:
import { useRouter } from "next/navigation"; // ✅ ĐÚNG
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  User as UserIcon,
  Heart,
  Package,
  Trash2,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Product } from "@/types/product";
import { getFirebaseOrdersByEmail } from "@/services/productService";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, wishlist, toggleWishlist } = useAuthStore();
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Load Wishlist & Orders
  useEffect(() => {
    if (!isLoading && !user) return; // router.push handled by parent/auth guard usually

    // Fetch Wishlist
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

    // Fetch Orders
    const loadOrders = async () => {
      if (!user?.email) return;
      setIsLoadingOrders(true);
      const orders = await getFirebaseOrdersByEmail(user.email);
      setUserOrders(orders);
      setIsLoadingOrders(false);
    };

    loadWishlist();
    loadOrders();
  }, [user, wishlist, isLoading]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#C9A63F] animate-pulse">
        ĐANG KẾT NỐI...
      </div>
    );

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-40 pb-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* PROFILE HEADER - Thiết kế dạng Card VIP */}
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
                    <ShieldCheck size={12} /> Thành viên Gold
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => signOut(auth)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
            >
              <LogOut size={16} /> Đăng xuất
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
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="group flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-[#C9A63F]/30 transition-all"
                  >
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                        Mã: #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-lg font-black">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.totalAmount)}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-black px-4 py-2 rounded-lg text-[#C9A63F] border border-[#C9A63F]/20">
                      {order.status}
                    </span>
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
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(p.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="text-zinc-600 hover:text-red-500"
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
