"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export const useCart = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Lấy các state và actions một cách tường minh từ Store
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

  // Trình trạng Server Side Rendering (SSR)
  if (!isMounted) {
    return {
      items: [],
      addItem: () => {}, // Trả về hàm trống để khớp kiểu dữ liệu
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      totalPrice: 0,
      totalItems: 0,
      isMounted: false,
    };
  }

  // Trạng thái Client Side (Đã Mounted)
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
