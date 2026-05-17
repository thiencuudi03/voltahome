// src/components/providers/AuthInitializer.tsx
"use client";

import React, { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, fetchWishlist } = useAuthStore();

  useEffect(() => {
    // Ép buộc bật trạng thái loading khi vừa tải trang để quét phiên đăng nhập
    useAuthStore.setState({ isLoading: true });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          // Đồng bộ danh sách yêu thích từ Firestore về Store
          await fetchWishlist(firebaseUser.uid);
        } else {
          setUser(null);
          useAuthStore.setState({ wishlist: [] });
        }
      } catch (error) {
        console.error("Lỗi khởi tạo đăng nhập:", error);
      } finally {
        // TẮT XOAY MÀN HÌNH: Dù thành công hay lỗi, vẫn phải tắt loading để mở giao diện
        useAuthStore.setState({ isLoading: false });
      }
    });

    return () => unsubscribe();
  }, [setUser, fetchWishlist]);

  return <>{children}</>;
}
