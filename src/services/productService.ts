import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

// 1. Hàm lấy danh sách tất cả sản phẩm (Cho trang chủ)
export const getFirebaseProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    return products;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Firebase:", error);
    return [];
  }
};

// 2. Hàm lấy chi tiết 1 sản phẩm theo ID (Cho trang chi tiết)
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Product;
    } else {
      console.log("Không tìm thấy sản phẩm!");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    return null;
  }
};
