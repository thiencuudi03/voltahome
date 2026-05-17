// src/services/productService.ts
import { Product } from "@/types/product";

/**
 * 1. Hàm lấy danh sách tất cả sản phẩm
 * Gọi qua Backend API trung gian
 */
export const getFirebaseProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/api/products", {
      method: "GET",
      cache: "no-store", // Đảm bảo luôn lấy data mới từ Server
    });

    const result = await response.json();
    if (result.success) {
      return result.data as Product[];
    }
    return [];
  } catch (error) {
    console.error("Lỗi khi kết nối với Backend API Products:", error);
    return [];
  }
};

/**
 * 2. Hàm lấy chi tiết 1 sản phẩm theo ID
 * Gọi qua Backend API kèm tham số query string (?id=...)
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`/api/products?id=${id}`, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();
    if (result.success) {
      return result.data as Product;
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi kết nối với Backend API Product Detail:", error);
    return null;
  }
};

/**
 * 3. Hàm tạo đơn đặt hàng mới
 * Gửi toàn bộ giỏ hàng lên Backend Server để tính toán tổng tiền bảo mật
 */
export const createFirebaseOrder = async (orderData: {
  uid: string;
  items: { productId: string; quantity: number }[];
  customerInfo: { name: string; phone: string; address: string };
}) => {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API Backend đặt hàng:", error);
    return { success: false, message: "Không thể kết nối tới Server." };
  }
};
