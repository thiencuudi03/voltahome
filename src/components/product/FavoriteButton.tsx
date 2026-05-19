"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

interface FavoriteButtonProps {
  productId: string;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { wishlist, toggleWishlist } = useAuthStore();

  // Kiểm tra an toàn trước khi hiển thị trạng thái
  const isFavorite = wishlist.includes(productId);

  const handleToggle = () => {
    // 🌟 Kiểm tra dữ liệu: Nếu productId không có thì chặn ngay lập tức
    if (!productId) {
      toast.error("Không tìm thấy mã sản phẩm!");
      return;
    }

    toggleWishlist(productId);

    // Logic hiện thông báo
    if (isFavorite) {
      toast.info("Đã xóa khỏi danh sách yêu thích");
    } else {
      toast.success("Đã thêm vào yêu thích");
    }
  };

  return (
    <button
      onClick={handleToggle}
      type="button" // Thêm type="button" để tránh submit form nhầm
      className={`p-2 rounded-full transition-all duration-300 ${
        isFavorite
          ? "text-red-500 fill-red-500"
          : "text-zinc-500 hover:text-white"
      }`}
    >
      <Heart size={20} />
    </button>
  );
}
