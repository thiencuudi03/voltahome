"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import {
  addFirebaseWishlistItem,
  getFirebaseWishlist,
  deleteFirebaseWishlistItem,
} from "@/services/productService";
import { Product } from "@/types/product";

export default function FavoriteButton({ product }: { product: Product }) {
  const { user } = useAuthStore();

  const [isSaved, setIsSaved] = useState(false);
  const [wishlistDocId, setWishlistDocId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Khi tải trang, kiểm tra xem sản phẩm này đã nằm trong Wishlist của user chưa
  // ...
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      // 🌟 THÊM product?.id VÀO ĐÂY ĐỂ CHỐNG CRASH KHI DỮ LIỆU BỊ TRỐNG
      if (!user || !user.email || !product?.id) return;

      try {
        const list = await getFirebaseWishlist(user.email);
        const foundItem = list.find((item) => item.productId === product.id);

        if (foundItem) {
          setIsSaved(true);
          setWishlistDocId(foundItem.id);
        }
      } catch (error) {
        console.error("Lỗi kiểm tra trạng thái yêu thích:", error);
      }
    };

    checkFavoriteStatus();
    // 🌟 THÊM DẤU CHẤM HỎI VÀO BẢNG DEPENDENCIES NÀY LUÔN NHEN
  }, [user, product?.id]);
  // ...

  // Xử lý khi khách hàng bấm vào nút Trái tim
  const handleToggleFavorite = async () => {
    if (!user || !user.email) {
      toast.error("Vui lòng đăng nhập để sử dụng tính năng lưu trữ!");
      return;
    }

    setIsLoading(true);

    if (isSaved && wishlistDocId) {
      // TRƯỜNG HỢP 1: Đã lưu rồi -> Bấm vào để XÓA (Bỏ thả tim)
      const res = await deleteFirebaseWishlistItem(wishlistDocId);
      if (res.success) {
        setIsSaved(false);
        setWishlistDocId(null);
        toast.success("Đã gỡ thiết bị khỏi danh sách yêu thích.");
      } else {
        toast.error("Lỗi đường truyền, không thể gỡ bỏ lúc này.");
      }
    } else {
      // TRƯỜNG HỢP 2: Chưa lưu -> Bấm vào để THÊM (Thả tim)
      const res = await addFirebaseWishlistItem({
        userEmail: user.email,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
      });

      if (res.success) {
        setIsSaved(true);
        toast.success("❤️ Đã lưu vào bộ sưu tập của bạn!");

        // Quét lại Firebase để lấy cái ID Document vừa tạo gán vào state
        const list = await getFirebaseWishlist(user.email);
        const foundItem = list.find((item) => item.productId === product.id);
        if (foundItem) setWishlistDocId(foundItem.id);
      } else {
        toast.info(res.message); // Báo lỗi nếu Firebase phản hồi trùng lặp
      }
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      title={isSaved ? "Bỏ yêu thích" : "Lưu vào yêu thích"}
      className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center ${
        isSaved
          ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
          : "bg-white/5 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20"
      }`}
    >
      <Heart
        size={22}
        fill={isSaved ? "currentColor" : "none"}
        className={`${isLoading ? "animate-pulse" : ""} transition-all duration-300 ${isSaved ? "scale-110" : "scale-100"}`}
      />
    </button>
  );
}
