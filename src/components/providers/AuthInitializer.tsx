"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const fetchWishlist = useAuthStore((state) => state.fetchWishlist);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Đồng bộ wishlist ngay sau khi có user
        await fetchWishlist(firebaseUser.uid);
      } else {
        setUser(null);
        useAuthStore.setState({ wishlist: [] });
      }
    });

    return () => unsubscribe();
  }, [setUser, fetchWishlist]);

  return <>{children}</>;
}
