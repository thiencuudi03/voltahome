"use client";

import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";

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

    // Đảm bảo addItem nhận vào đúng đối tượng product
    if (addItem) {
      addItem(product);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-all ${className}`}
    >
      Thêm vào giỏ hàng
    </button>
  );
}
