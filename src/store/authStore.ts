import { create } from "zustand";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthState {
  user: any;
  wishlist: string[];
  isLoading: boolean;
  setWishlist: (wishlist: string[]) => void;
  setUser: (user: any) => void;
  fetchWishlist: (uid: string) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  wishlist: [],
  isLoading: true,

  setWishlist: (wishlist: string[]) => set({ wishlist }),
  setUser: (user: any) => set({ user, isLoading: false }),

  fetchWishlist: async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        set({ wishlist: data.wishlist || [] });
      } else {
        set({ wishlist: [] });
      }
    } catch (error) {
      console.error("Lỗi khi fetch wishlist từ Firestore:", error);
      set({ wishlist: [] });
    }
  },

  toggleWishlist: async (productId: string) => {
    if (!productId) return;
    const { user, wishlist } = get();
    if (!user) return;

    const isFavorite = wishlist.includes(productId);
    const userRef = doc(db, "users", user.uid);

    try {
      if (isFavorite) {
        await updateDoc(userRef, { wishlist: arrayRemove(productId) });
        set((state) => ({
          wishlist: state.wishlist.filter((id: string) => id !== productId),
        }));
      } else {
        await updateDoc(userRef, { wishlist: arrayUnion(productId) });
        set((state) => ({
          wishlist: [...state.wishlist, productId],
        }));
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
