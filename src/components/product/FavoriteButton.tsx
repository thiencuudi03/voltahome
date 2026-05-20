"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { Product } from "@/types/product";

export default function FavoriteButton({ product }: { product: Product }) {
  const { user, wishlist, toggleWishlist } = useAuthStore();

  // Kiểm tra an toàn: Đảm bảo product.id tồn tại trước khi kiểm tra
  const isSaved = product?.id ? wishlist.includes(product.id) : false;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Vui lòng đăng nhập để lưu sản phẩm!");
      return;
    }

    if (!product?.id) {
      toast.error("Lỗi dữ liệu sản phẩm!");
      return;
    }

    try {
      await toggleWishlist(product.id);

      // Hiển thị thông báo dựa trên trạng thái sau khi đã toggle
      if (isSaved) {
        toast.info("Đã gỡ khỏi danh sách yêu thích");
      } else {
        toast.success("❤️ Đã lưu vào bộ sưu tập!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
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
        className={`transition-all duration-300 ${isSaved ? "scale-110" : "scale-100"}`}
      />
    </button>
  );
}
