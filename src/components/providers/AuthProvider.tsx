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
    // Mỗi khi F5 hoặc đổi route, bật trạng thái Loading kiểm tra an toàn
    useAuthStore.setState({ isLoading: true });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchWishlist(firebaseUser.uid);
      } else {
        setUser(null);
        useAuthStore.setState({ wishlist: [] });
      }
      // QUAN TRỌNG: Chỉ tắt Loading sau khi đã nạp đủ dữ liệu User và Wishlist vào Store
      useAuthStore.setState({ isLoading: false });
    });

    return () => unsubscribe();
  }, [setUser, fetchWishlist]);

  return <>{children}</>;
}
