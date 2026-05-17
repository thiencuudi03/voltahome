// src/app/(shop)/account/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { LogOut, User as UserIcon, Heart, Package, Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Product } from "@/types/product";

export default function AccountPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Kéo dữ liệu và hàm từ zustand store
  const { wishlist, fetchWishlist, toggleWishlist } = useAuthStore();

  // State quản lý mảng sản phẩm chi tiết sau khi fetch từ Firestore
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // 1. Kiểm tra trạng thái đăng nhập của người dùng
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        fetchWishlist(firebaseUser.uid);
        setIsChecking(false);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router, fetchWishlist]);

  // 2. Tự động lắng nghe sự thay đổi của wishlist để fetch thông tin chi tiết sản phẩm
  useEffect(() => {
    const loadWishlistProducts = async () => {
      if (!wishlist || wishlist.length === 0) {
        setSavedProducts([]);
        return;
      }

      setIsLoadingProducts(true);
      try {
        // Fetch song song tất cả các sản phẩm có ID nằm trong wishlist
        const productPromises = wishlist.map(async (id) => {
          const docRef = doc(db, "products", id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            return { id: snap.id, ...snap.data() } as Product;
          }
          return null;
        });

        const results = await Promise.all(productPromises);
        // Loại bỏ các phần tử null nếu sản phẩm không tồn tại trong db
        setSavedProducts(results.filter((p): p is Product => p !== null));
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm wishlist:", error);
      } finally {
        // ĐÃ SỬA CHÍNH XÁC CHỮ FINALLY Ở ĐÂY
        setIsLoadingProducts(false);
      }
    };

    loadWishlistProducts();
  }, [wishlist]);

  // Giao diện màn hình chờ tải thông tin đăng nhập
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#C9A63F] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.15em]">
          Đang xác thực bảo mật...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* BANNER THÔNG TIN TÀI KHOẢN VIP */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#C9A63F]/10 border border-[#C9A63F]/30 flex items-center justify-center text-[#C9A63F]">
              <UserIcon size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter italic">
                {currentUser.displayName || currentUser.email?.split("@")[0]}
              </h1>
              <p className="text-gray-500 text-sm italic">
                {currentUser.email}
              </p>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#C9A63F]/10 border border-[#C9A63F]/20 text-[#C9A63F] text-[10px] font-bold uppercase tracking-widest">
                Thành viên VIP
              </div>
            </div>
          </div>
          <button
            onClick={async () => {
              await signOut(auth);
              router.push("/login");
            }}
            className="px-8 py-3 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            Đăng xuất hệ thống
          </button>
        </div>

        {/* KHU VỰC QUẢN LÝ TÁC VỤ CHÍNH */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* CỘT 1: LỊCH SỬ GIAO DỊCH / ĐƠN HÀNG */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 space-y-6 min-h-[300px] flex flex-col">
            <div className="flex items-center gap-3 text-[#C9A63F]">
              <Package size={20} />
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                Đơn hàng gần đây
              </h2>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-600 text-sm font-light italic">
                Chưa có dữ liệu giao dịch.
              </p>
            </div>
          </div>

          {/* CỘT 2: DANH SÁCH SẢN PHẨM ĐÃ LƯU (WISHLIST) */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-red-500">
                <Heart size={20} fill="currentColor" />
                <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                  Sản phẩm đã lưu
                </h2>
              </div>
              <span className="text-[10px] text-gray-400 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {wishlist.length} Món
              </span>
            </div>

            {/* Trạng thái đang tải dữ liệu sản phẩm */}
            {isLoadingProducts ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-white/10 border-t-[#C9A63F] rounded-full animate-spin"></div>
              </div>
            ) : savedProducts.length > 0 ? (
              // DANH SÁCH ÉP 1 CỘT - KHÔNG BỊ LỆCH GRID - CÓ THANH CUỘN NẾU QUÁ DÀI
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 chunk-scrollbar">
                {savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4 group hover:border-[#C9A63F]/20 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    {/* KHỐI THÔNG TIN SẢN PHẨM */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {/* Ảnh Sản Phẩm Bo Góc */}
                      <Link
                        href={`/products/${product.id}`}
                        className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-white/5 p-1.5"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>

                      {/* Tên và Giá hiển thị sắc nét */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <Link href={`/products/${product.id}`}>
                          <h4 className="text-xs font-bold text-white truncate hover:text-[#C9A63F] transition-colors tracking-tight">
                            {product.name}
                          </h4>
                        </Link>
                        <p className="text-[#C9A63F] text-[11px] font-black tracking-wide">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </p>
                      </div>
                    </div>

                    {/* NÚT THÙNG RÁC XÓA NHANH KHỎI DANH SÁCH */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all duration-300 flex-shrink-0"
                      title="Xóa khỏi danh sách"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // Trạng thái trống khi chưa yêu thích món nào
              <div className="flex justify-center py-12">
                <p className="text-gray-600 text-sm font-light italic">
                  Danh sách trống.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
