// src/components/AuthWrapper.tsx
"use client";

import React, { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Ép nạp user VÀ tắt loading ngầm
      useAuthStore.setState({ user: firebaseUser, isLoading: false });
    });
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
