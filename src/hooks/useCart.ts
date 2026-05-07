"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export const useCart = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Nếu vẫn bị đỏ ở 'state', bạn có thể viết (state: any) để chữa cháy nhanh,
  // nhưng cách tốt nhất là đảm bảo Bước 1 đã chuẩn.
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return {
      items: [],
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalPrice: 0,
      totalItems: 0,
      isMounted: false,
    };
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice: getTotalPrice(),
    totalItems: getTotalItems(),
    isMounted: true,
  };
};
