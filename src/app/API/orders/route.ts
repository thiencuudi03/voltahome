import { NextResponse } from "next/server";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ========================================================
// 1. API GET: Lấy toàn bộ đơn hàng (Dành cho Admin Dashboard)
// ========================================================
export async function GET() {
  try {
    const ordersRef = collection(db, "orders");
    // Tạo truy vấn sắp xếp đơn hàng mới nhất lên đầu
    const querySnapshot = await getDocs(ordersRef);

    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Backend: Tải danh sách đơn hàng thành công!",
        data: orders,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Backend Error (GET Orders):", error);
    return NextResponse.json(
      {
        success: false,
        message: "Backend: Lỗi hệ thống không thể lấy danh sách đơn hàng.",
      },
      { status: 500 },
    );
  }
}

// ========================================================
// 2. API POST: Khách hàng tiến hành đặt hàng (Giữ nguyên luồng cũ)
// ========================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, items, customerInfo } = body;

    if (!uid || !items || items.length === 0 || !customerInfo) {
      return NextResponse.json(
        { success: false, message: "Backend: Thiếu thông tin đơn hàng." },
        { status: 400 },
      );
    }

    let totalAmount = 0;
    const verifiedItems = [];

    for (const item of items) {
      const productRef = doc(db, "products", item.productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        return NextResponse.json(
          { success: false, message: `Backend: Sản phẩm không tồn tại!` },
          { status: 404 },
        );
      }

      const productData = productSnap.data();
      totalAmount += productData.price * item.quantity;

      verifiedItems.push({
        productId: item.productId,
        name: productData.name,
        price: productData.price,
        quantity: item.quantity,
        image: productData.image,
      });
    }

    const orderRef = await addDoc(collection(db, "orders"), {
      userId: uid,
      items: verifiedItems,
      totalAmount,
      customerInfo,
      status: "Chờ xác nhận",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Backend: Khởi tạo đơn hàng thành công!",
        orderId: orderRef.id,
        totalAmount,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Backend Error (POST Orders):", error);
    return NextResponse.json(
      { success: false, message: "Backend: Lỗi hệ thống đơn hàng." },
      { status: 500 },
    );
  }
}
