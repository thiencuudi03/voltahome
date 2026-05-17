// src/components/providers/AuthListener.tsx
"use client"; // Đánh dấu đây hoàn toàn là Client Component

import React, { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";

export default function AuthListener({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Lắng nghe trạng thái đăng nhập thực tế thời gian thực từ Backend Firebase
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Cập nhật trạng thái người dùng thật vào Global Store của bạn
      if (useAuthStore.getState().setUser) {
        useAuthStore.getState().setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
