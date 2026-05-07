"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

// Đây là phần quan trọng để hết bị đỏ state
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  // Truyền CartState vào đây
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        /* logic */
      },
      removeItem: (id) => {
        /* logic */
      },
      updateQuantity: (id, q) => {
        /* logic */
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    { name: "volt-home-cart" },
  ),
);
