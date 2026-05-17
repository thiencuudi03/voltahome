// src/components/providers/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, fetchWishlist } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Nếu ĐÃ ĐĂNG NHẬP -> Kéo wishlist về rồi mới tắt loading
        setUser(firebaseUser);
        await fetchWishlist(firebaseUser.uid);
        useAuthStore.setState({ isLoading: false });
      } else {
        // Nếu CHƯA ĐĂNG NHẬP -> Tắt ngay loading để trang chủ, trang sản phẩm hiện ra bình thường!
        setUser(null);
        useAuthStore.setState({ isLoading: false, wishlist: [] });
      }
    });

    return () => unsubscribe();
  }, [setUser, fetchWishlist]);

  return <>{children}</>;
}
