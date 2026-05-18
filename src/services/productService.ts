import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Nhập thẳng cấu hình Firebase của bạn
import { Product } from "@/types/product";

export const getFirebaseProducts = async (): Promise<Product[]> => {
  try {
    console.log("👉 Frontend đang tự mình vượt tường lửa gọi lên Firebase...");

    // TRÌNH DUYỆT TỰ GỌI TRỰC TIẾP LÊN FIREBASE (Không thèm qua API nội bộ nữa)
    const querySnapshot = await getDocs(collection(db, "products"));

    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Sản phẩm không tên",
        price: data.price || 0,
        rating: data.rating || 5,
        stock: data.stock !== undefined ? Number(data.stock) : 10,
        description: data.description || "",

        // Vẫn giữ bộ chuyển đổi cấu trúc siêu việt của chúng ta
        category: data.category || data.kind || "accessory",
        image: data.picture || data.image || data.URL || "",
        images: data.images || (data.picture ? [data.picture] : []),
        descriptionData: data.descriptionData || [],
      } as Product;
    });

    console.log("📦 Dữ liệu thật lấy được từ Firebase:", products);
    return products;
  } catch (error) {
    console.error("Lỗi khi trình duyệt kết nối Firebase:", error);
    return [];
  }
};
