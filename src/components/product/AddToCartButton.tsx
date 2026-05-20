"use client";

import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showIcon?: boolean;
}

export default function AddToCartButton({
  product,
  className = "",
  showIcon = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;

    // Thêm vào giỏ hàng
    addItem(product);

    // Thông báo thành công
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`, {
      description: "Bạn có thể xem giỏ hàng ở góc phải.",
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center justify-center gap-2 bg-white text-black py-4 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all ${className}`}
    >
      {showIcon && <ShoppingCart size={16} />}
      Thêm vào giỏ hàng
    </button>
  );
}
