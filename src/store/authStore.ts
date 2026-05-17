// src/store/authStore.ts
import { create } from "zustand";
import { auth, db } from "@/lib/firebase"; // Đảm bảo lib/firebase.ts đã export db = getFirestore()
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

interface AuthState {
  user: any | null;
  isLoading: boolean;
  wishlist: string[]; // Danh sách ID sản phẩm yêu thích
  setUser: (user: any | null) => void;
  // Hàm thả tim/bỏ tim
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
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      set({ wishlist: docSnap.data().wishlist || [] });
    }
  },

  toggleWishlist: async (productId) => {
    const { user, wishlist } = get();
    if (!user) {
      alert("Vui lòng đăng nhập để lưu sản phẩm yêu thích!");
      return;
    }

    const isFavorite = wishlist.includes(productId);
    const userRef = doc(db, "users", user.uid);

    try {
      if (isFavorite) {
        // Bỏ tim
        await updateDoc(userRef, { wishlist: arrayRemove(productId) });
        set({ wishlist: wishlist.filter((id) => id !== productId) });
      } else {
        // Thêm tim
        await updateDoc(userRef, { wishlist: arrayUnion(productId) });
        set({ wishlist: [...wishlist, productId] });
      }
    } catch (error) {
      console.error("Lỗi cập nhật wishlist:", error);
    }
  },

  logout: async () => {
    await auth.signOut();
    set({ user: null, wishlist: [], isLoading: false });
  },
}));
