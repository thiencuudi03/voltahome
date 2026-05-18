export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ========================================================
// 1. API GET: Lấy toàn bộ danh sách hoặc chi tiết 1 sản phẩm
// ========================================================
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    // TRƯỜNG HỢP A: Nếu Frontend truyền ID (?id=xxx) -> Trả về chi tiết 1 sản phẩm nâng cao
    if (id) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return NextResponse.json(
          {
            success: true,
            message: "Backend: Tải chi tiết sản phẩm thành công!",
            data: {
              id: docSnap.id,
              name: data.name || "Sản phẩm không tên",
              price: data.price || 0,
              rating: data.rating || 5,
              stock: data.stock !== undefined ? Number(data.stock) : 10,
              description: data.description || "",

              // Ánh xạ linh hoạt cấu trúc dữ liệu từ cơ sở dữ liệu sang chuẩn hiển thị Frontend
              category: data.category || data.kind || "accessory",
              image: data.picture || data.image || data.URL || "",
              images: data.images || (data.picture ? [data.picture] : []),
              descriptionData: data.descriptionData || [],
            },
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

    // TRƯỜNG HỢP B: Nếu không có ID -> Trả về toàn bộ danh sách sản phẩm dữ liệu tươi
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

        // Tự động ánh xạ đồng bộ tên trường dữ liệu từ cơ sở dữ liệu sang chuẩn Frontend
        category: data.category || data.kind || "accessory",
        image: data.picture || data.image || data.URL || "",
        images: data.images || (data.picture ? [data.picture] : []),
        descriptionData: data.descriptionData || [],
      };
    });

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

// ========================================================
// 2. API POST: Thêm sản phẩm mới (Đồng bộ cấu trúc nâng cao lên Database)
// ========================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      image,
      category,
      stock,
      rating,
      images,
      descriptionData,
    } = body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào tại Server để đảm bảo an toàn hệ thống
    if (!name || !price || !category) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Backend: Thiếu các thông tin bắt buộc (Tên, Giá, Danh mục).",
        },
        { status: 400 },
      );
    }

    // Lưu xuống Firestore đồng thời cả các định dạng trường cũ và mới để duy trì tính tương thích
    const docRef = await addDoc(collection(db, "products"), {
      name,
      description: description || "",
      price: Number(price),
      picture: image || "", // Tương thích ngược với các trường ảnh cũ
      category: category, // Lưu tên danh mục theo chuẩn mới
      kind: category, // Dự phòng luồng lọc cũ theo kind
      stock: stock !== undefined ? Number(stock) : 0,
      rating: rating !== undefined ? Number(rating) : 5,
      images: images || (image ? [image] : []), // Khởi tạo mảng bộ sưu tập ảnh
      descriptionData: descriptionData || [], // Mảng cấu trúc mô tả chi tiết của sản phẩm nếu có
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
        message: "Backend: Không thể lưu sản phẩm lên cơ sở dữ liệu.",
      },
      { status: 500 },
    );
  }
}
