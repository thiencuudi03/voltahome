// src/app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json(
      { success: false, message: "Backend: Thiếu UID người dùng." },
      { status: 400 },
    );
  }

  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const wishlist = docSnap.exists() ? docSnap.data().wishlist || [] : [];

    return NextResponse.json(
      { success: true, data: wishlist },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Backend Error (GET Wishlist):", error);
    return NextResponse.json(
      { success: false, message: "Backend: Lỗi lấy danh sách yêu thích." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, productId, action } = body;

    if (!uid || !productId || !action) {
      return NextResponse.json(
        { success: false, message: "Backend: Thiếu thông tin xử lý dữ liệu." },
        { status: 400 },
      );
    }

    const userRef = doc(db, "users", uid);

    if (action === "add") {
      await setDoc(
        userRef,
        { wishlist: arrayUnion(productId) },
        { merge: true },
      );
    } else if (action === "remove") {
      await setDoc(
        userRef,
        { wishlist: arrayRemove(productId) },
        { merge: true },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Backend: Cập nhật danh sách yêu thích thành công!`,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Backend Error (POST Wishlist):", error);
    return NextResponse.json(
      { success: false, message: "Backend: Không thể cập nhật dữ liệu." },
      { status: 500 },
    );
  }
}
