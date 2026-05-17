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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (useAuthStore.getState().setUser) {
        useAuthStore.getState().setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
