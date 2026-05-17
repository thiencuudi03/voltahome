// src/components/products/FavoriteButton.tsx
"use client";

import { Heart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function FavoriteButton({ productId }: { productId: string }) {
  const { wishlist, toggleWishlist, user } = useAuthStore();
  const isFavorite = wishlist.includes(productId);

  const handleToggle = async (e: React.MouseEvent) => {
    // Chặn sự kiện click bị "xuyên" xuống thẻ Link cha gây nhảy trang
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Từ chối truy cập!", {
        description:
          "Vui lòng đăng nhập tài khoản VIP để lưu sản phẩm yêu thích.",
        duration: 3000,
      });
      return;
    }

    await toggleWishlist(productId);

    // Thông báo cho người dùng biết (dùng logic ngược lại vì trạng thái vừa bị toggle)
    if (!isFavorite) {
      toast.success("Đã thêm vào danh sách VIP!", {
        icon: <Heart size={14} fill="#ef4444" className="text-red-500" />,
      });
    } else {
      toast.info("Đã xóa khỏi danh sách yêu thích.");
    }
  };

  return (
    <button
      onClick={handleToggle}
      // NÂNG CẤP CSS: Thêm nền đen mờ backdrop-blur để nổi bần bật trên mọi nền ảnh
      className={`w-9 h-9 flex items-center justify-center rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 ${
        isFavorite
          ? "bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/30"
          : "bg-black/50 border-white/10 text-gray-400 hover:text-[#C9A63F] hover:border-[#C9A63F]/50 hover:bg-black/70 hover:shadow-[0_0_10px_rgba(201,166,63,0.5)]"
      }`}
      title="Thêm vào danh sách yêu thích"
    >
      <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
}
