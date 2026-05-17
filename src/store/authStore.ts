// src/store/authStore.ts
import { create } from "zustand";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

interface AuthState {
  user: any | null;
  isLoading: boolean;
  wishlist: string[];
  setUser: (user: any | null) => void;
  toggleWishlist: (productId: string) => Promise<void>;
  fetchWishlist: (uid: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  wishlist: [],

  setUser: (user) => set({ user }),

  fetchWishlist: async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ wishlist: docSnap.data().wishlist || [] });
      } else {
        set({ wishlist: [] });
      }
    } catch (error) {
      console.error("Lỗi lấy wishlist:", error);
      set({ wishlist: [] });
    }
  },

  toggleWishlist: async (productId) => {
    const { user, wishlist } = get();
    if (!user) return;

    const isFavorite = wishlist.includes(productId);
    const userRef = doc(db, "users", user.uid);

    try {
      if (isFavorite) {
        await setDoc(
          userRef,
          { wishlist: arrayRemove(productId) },
          { merge: true },
        );
        set({ wishlist: wishlist.filter((id) => id !== productId) });
      } else {
        await setDoc(
          userRef,
          { wishlist: arrayUnion(productId) },
          { merge: true },
        );
        set({ wishlist: [...wishlist, productId] });
      }
    } catch (error) {
      console.error("Lỗi cập nhật wishlist:", error);
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
      set({ user: null, wishlist: [], isLoading: false });
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  },
}));
