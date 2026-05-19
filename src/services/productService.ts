import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

// ============================================================================
// 1. TÁC VỤ SẢN PHẨM: LẤY DANH SÁCH SẢN PHẨM VỀ BẢNG KHO (READ)
// ============================================================================
export const getFirebaseProducts = async (): Promise<Product[]> => {
  try {
    console.log("🚀 Trình duyệt đang kéo dữ liệu thiết bị từ Firestore...");
    const querySnapshot = await getDocs(collection(db, "products"));

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Sản phẩm không tên",
        price: data.price || 0,
        rating: data.rating || 5,
        stock: data.stock !== undefined ? Number(data.stock) : 10,
        description: data.description || "",

        // Cơ chế tương thích ngược dữ liệu cũ
        category: data.category || data.kind || "accessory",
        image: data.picture || data.image || data.URL || "",
        images: data.images || (data.picture ? [data.picture] : []),
        descriptionData: data.descriptionData || [],
      } as Product;
    });
  } catch (error) {
    console.error("❌ Thất bại khi đồng bộ danh sách sản phẩm:", error);
    return [];
  }
};

// ============================================================================
// 2. TÁC VỤ SẢN PHẨM: THÊM MỚI SIÊU PHẨM VÀO KHO (CREATE)
// ============================================================================
export const addFirebaseProduct = async (productData: any) => {
  try {
    console.log("🚀 Đang khởi tạo và đẩy sản phẩm mới lên Cloud...");
    const docRef = await addDoc(collection(db, "products"), {
      name: productData.name,
      price: Number(productData.price),
      category: productData.category,
      kind: productData.category,
      stock: Number(productData.stock),
      rating: 5,
      picture: productData.image,
      image: productData.image,
      description: productData.description || "",
      createdAt: new Date().toISOString(),
    });

    console.log("✅ Đã ghi nhận sản phẩm mới vào DB! ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Thất bại khi tạo sản phẩm mới:", error);
    return { success: false };
  }
};

// ============================================================================
// 3. TÁC VỤ SẢN PHẨM: CHỈNH SỬA GIÁ CẢ & SỐ LƯỢNG INLINE (UPDATE)
// ============================================================================
export const updateFirebaseProduct = async (id: string, updatedData: any) => {
  try {
    console.log(`🚀 Đang truyền lệnh cập nhật cho Sản phẩm ID: ${id}`);
    const productRef = doc(db, "products", id);

    await updateDoc(productRef, {
      name: updatedData.name,
      price: Number(updatedData.price),
      category: updatedData.category,
      kind: updatedData.category,
      stock: Number(updatedData.stock),
      image: updatedData.image,
      picture: updatedData.image,
    });

    return { success: true };
  } catch (error) {
    console.error(`❌ Thất bại khi cập nhật sản phẩm ID ${id}:`, error);
    return { success: false };
  }
};

// ============================================================================
// 4. TÁC VỤ SẢN PHẨM: XÓA SẢN PHẨM KHỎI HỆ THỐNG (DELETE)
// ============================================================================
export const deleteFirebaseProduct = async (id: string) => {
  try {
    console.log(`🚀 Đang phát lệnh gỡ bỏ Sản phẩm ID: ${id}`);
    const productRef = doc(db, "products", id);

    await deleteDoc(productRef);
    return { success: true };
  } catch (error) {
    console.error(`❌ Thất bại khi xóa sản phẩm ID ${id}:`, error);
    return { success: false };
  }
};

// ============================================================================
// 5. TÁC VỤ DANH MỤC: LẤY DANH SÁCH DANH MỤC NGÀNH HÀNG (READ)
// ============================================================================
export const getFirebaseCategories = async (): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const cats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Cơ chế fallback dự phòng để giao diện không bị trắng nếu DB trống
    if (cats.length === 0) {
      return [
        {
          id: "default_1",
          name: "MacBook & Laptop",
          slug: "laptop",
          icon: "💻",
        },
        { id: "default_2", name: "iPhone", slug: "iphone", icon: "📱" },
        { id: "default_3", name: "Samsung", slug: "samsung", icon: "🤖" },
        { id: "default_4", name: "Tai nghe Luxury", slug: "audio", icon: "🎧" },
        {
          id: "default_5",
          name: "Phụ kiện cao cấp",
          slug: "accessory",
          icon: "⚡",
        },
      ];
    }
    return cats;
  } catch (error) {
    console.error("❌ Lỗi tải danh mục từ Firebase:", error);
    return [];
  }
};

// ============================================================================
// 6. TÁC VỤ DANH MỤC: KHỞI TẠO DANH MỤC MỚI (CREATE)
// ============================================================================
export const addFirebaseCategory = async (catData: any) => {
  try {
    const docRef = await addDoc(collection(db, "categories"), {
      name: catData.name,
      slug: catData.slug.toLowerCase().trim(),
      icon: catData.icon || "📁",
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Lỗi thêm danh mục mới:", error);
    return { success: false };
  }
};

// ============================================================================
// 7. TÁC VỤ DANH MỤC: CẬP NHẬT THÔNG TIN DANH MỤC (UPDATE)
// ============================================================================
export const updateFirebaseCategory = async (id: string, updatedData: any) => {
  try {
    const catRef = doc(db, "categories", id);
    await updateDoc(catRef, {
      name: updatedData.name,
      slug: updatedData.slug.toLowerCase().trim(),
      icon: updatedData.icon,
    });
    return { success: true };
  } catch (error) {
    console.error("❌ Lỗi sửa danh mục:", error);
    return { success: false };
  }
};

// ============================================================================
// 8. TÁC VỤ DANH MỤC: XÓA DANH MỤC KHỎI CLOUD (DELETE)
// ============================================================================
export const deleteFirebaseCategory = async (id: string) => {
  try {
    const catRef = doc(db, "categories", id);
    await deleteDoc(catRef);
    return { success: true };
  } catch (error) {
    console.error("❌ Lỗi xóa danh mục:", error);
    return { success: false };
  }
};

// ============================================================================
// 9. TÁC VỤ HÓA ĐƠN: LẤY TOÀN BỘ SỔ LỊCH SỬ ĐƠN HÀNG (READ)
// ============================================================================
export const getFirebaseOrders = async (): Promise<any[]> => {
  try {
    console.log("🚀 Trình duyệt đang tải danh sách đơn hàng thực tế...");
    const querySnapshot = await getDocs(collection(db, "orders"));

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ Thất bại khi kéo dữ liệu hóa đơn:", error);
    return [];
  }
};

// ============================================================================
// 10. TÁC VỤ HÓA ĐƠN: DUYỆT TRẠNG THÁI ĐƠN HÀNG (UPDATE)
// ============================================================================
export const updateFirebaseOrderStatus = async (
  id: string,
  newStatus: string,
) => {
  try {
    console.log(
      `🚀 Đang cập nhật trạng thái đơn hàng ${id} thành: ${newStatus}`,
    );
    const orderRef = doc(db, "orders", id);

    await updateDoc(orderRef, {
      status: newStatus,
    });
    return { success: true };
  } catch (error) {
    console.error("❌ Thất bại khi cập nhật trạng thái đơn hàng:", error);
    return { success: false };
  }
};

// ============================================================================
// 11. TÁC VỤ THANH TOÁN: TẠO ĐƠN HÀNG MỚI + TỰ ĐỘNG KHẤU TRỪ KHO TỒN
// ============================================================================
export const createFirebaseOrder = async (orderData: any) => {
  try {
    console.log("🚀 Đang đóng gói dữ liệu và đẩy hóa đơn checkout lên mây...");

    // Bước A: Tạo tài liệu hóa đơn mới
    const docRef = await addDoc(collection(db, "orders"), {
      customerInfo: {
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        note: orderData.note || "",
      },
      items: orderData.items || [],
      totalAmount: Number(orderData.totalAmount),
      status: "Chờ xác nhận",
      paymentMethod: orderData.paymentMethod || "cod",
      createdAt: new Date().toISOString(),
    });

    console.log(
      "✅ Đã tạo hóa đơn thành công! Tiến hành khấu trừ số lượng kho...",
    );

    // Bước B: Chạy vòng lặp trừ kho tự động bằng hàm increment toán học an toàn
    const updateStockPromises = orderData.items.map(async (item: any) => {
      const productRef = doc(db, "products", item.id);

      await updateDoc(productRef, {
        stock: increment(-Number(item.quantity)), // Trừ đúng số lượng khách mua
      });
    });

    // Kích hoạt đồng loạt luồng xử lý
    await Promise.all(updateStockPromises);

    console.log("🔒 Hoàn tất chu trình: Kho hàng tự động cập nhật số tồn mới.");
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(
      "❌ Lỗi nghiêm trọng trong chu trình checkout trừ kho:",
      error,
    );
    return { success: false };
  }
};

// ... (Giữ nguyên toàn bộ các hàm quản trị và checkout cũ ở trên) ...

// ============================================================================
// 12. TÁC VỤ USER: LẤY ĐƠN HÀNG THEO EMAIL KHÁCH HÀNG
// ============================================================================
export const getFirebaseOrdersByEmail = async (
  email: string,
): Promise<any[]> => {
  try {
    const allOrders = await getFirebaseOrders();
    // Lọc lấy đúng các đơn hàng có email trùng với user đang đăng nhập
    return allOrders.filter(
      (order) =>
        order.customerInfo?.email?.toLowerCase() === email.toLowerCase(),
    );
  } catch (error) {
    console.error("❌ Lỗi lọc lịch sử đơn hàng của user:", error);
    return [];
  }
};

// ============================================================================
// 13. TÁC VỤ USER: LẤY DANH SÁCH SẢN PHẨM ĐÃ LƯU (WISHLIST)
// ============================================================================
export const getFirebaseWishlist = async (email: string): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "wishlist"));
    const allWishitems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Lọc danh sách yêu thích của riêng user này
    return allWishitems.filter(
      (item: any) => item.userEmail?.toLowerCase() === email.toLowerCase(),
    );
  } catch (error) {
    console.error("❌ Lỗi tải danh sách sản phẩm đã lưu:", error);
    return [];
  }
};

// ============================================================================
// 14. TÁC VỤ USER: XÓA SẢN PHẨM KHỎI DANH SÁCH ĐÃ LƯU
// ============================================================================
export const deleteFirebaseWishlistItem = async (id: string) => {
  try {
    const wishRef = doc(db, "wishlist", id);
    await deleteDoc(wishRef);
    return { success: true };
  } catch (error) {
    console.error("❌ Lỗi xóa sản phẩm yêu thích:", error);
    return { success: false };
  }
};

// ============================================================================
// 15. TÁC VỤ USER: THÊM SẢN PHẨM VÀO DANH SÁCH YÊU THÍCH (ADD WISHLIST)
// ============================================================================
export const addFirebaseWishlistItem = async (wishData: {
  userEmail: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
}) => {
  try {
    // 1. Kiểm tra xem người dùng đã lưu món này chưa để tránh trùng lặp
    const querySnapshot = await getDocs(collection(db, "wishlist"));
    const existingItems = querySnapshot.docs.map((doc) => doc.data());
    const isAlreadySaved = existingItems.some(
      (item) =>
        item.userEmail === wishData.userEmail &&
        item.productId === wishData.productId,
    );

    if (isAlreadySaved) {
      return {
        success: false,
        message: "Sản phẩm đã có trong danh sách yêu thích.",
      };
    }

    // 2. Nếu chưa lưu thì thêm mới vào bộ sưu tập 'wishlist'
    await addDoc(collection(db, "wishlist"), {
      userEmail: wishData.userEmail,
      productId: wishData.productId,
      productName: wishData.productName,
      productPrice: Number(wishData.productPrice),
      productImage: wishData.productImage,
      addedAt: new Date().toISOString(),
    });

    return { success: true, message: "Đã lưu vào danh sách yêu thích!" };
  } catch (error) {
    console.error("❌ Lỗi khi thêm vào wishlist:", error);
    return { success: false, message: "Lỗi đường truyền, vui lòng thử lại." };
  }
};
