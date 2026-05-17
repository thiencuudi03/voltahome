// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// 1. API GET: Xử lý thông minh cho cả lấy tất cả hoặc lấy chi tiết 1 sản phẩm
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Lấy tham số ?id=... từ URL

  try {
    // TRƯỜNG HỢP A: Nếu Client truyền ID -> Trả về chi tiết 1 sản phẩm
    if (id) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return NextResponse.json(
          {
            success: true,
            message: "Backend: Tải chi tiết sản phẩm thành công!",
            data: { id: docSnap.id, ...docSnap.data() },
          },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Backend: Không tìm thấy sản phẩm này trong hệ thống.",
          },
          { status: 404 },
        );
      }
    }

    // TRƯỜNG HỢP B: Nếu Client không truyền ID -> Trả về toàn bộ danh sách
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Backend: Tải danh sách sản phẩm thành công!",
        data: products,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Backend Error (GET Products):", error);
    return NextResponse.json(
      {
        success: false,
        message: "Backend: Lỗi kết nối cơ sở dữ liệu Server.",
      },
      { status: 500 },
    );
  }
}

// 2. API POST: Thêm sản phẩm mới (Dành cho phân hệ Admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image, category, stock, rating } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Backend: Thiếu thông tin bắt buộc (Tên, Giá, Danh mục).",
        },
        { status: 400 },
      );
    }

    const docRef = await addDoc(collection(db, "products"), {
      name,
      description: description || "",
      price: Number(price),
      image: image || "",
      category,
      stock: Number(stock) || 0,
      rating: Number(rating) || 5,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Backend: Thêm sản phẩm thành công!",
        id: docRef.id,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Backend Error (POST Products):", error);
    return NextResponse.json(
      {
        success: false,
        message: "Backend: Không thể lưu sản phẩm.",
      },
      { status: 500 },
    );
  }
}
