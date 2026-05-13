"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { mockProducts } from "@/data/mockProducts";
import { toast } from "sonner";

export default function TestFirebasePage() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadData = async () => {
    setIsUploading(true);
    const toastId = toast.loading(
      "Đang kết nối và đẩy dữ liệu lên Cloud Firestore...",
    );

    try {
      // Duyệt qua từng sản phẩm trong file mockProducts chuẩn của bạn
      for (const product of mockProducts) {
        // Lệnh setDoc sẽ ghi đè nếu ID đã tồn tại, hoặc tạo mới nếu chưa có
        await setDoc(doc(db, "products", product.id), {
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          // LẤY MẢNG ẢNH: Nếu sản phẩm không có mảng images,
          // nó sẽ tự tạo mảng chứa 3 ảnh chính để không bị lỗi giao diện.
          images: product.images || [
            product.image,
            product.image,
            product.image,
          ],
          category: product.category,
          stock: product.stock,
          rating: product.rating || 4.9,
          updatedAt: new Date().toISOString(),
        });
      }

      toast.success(
        "Thành công! Toàn bộ sản phẩm và thư viện ảnh đã lên Cloud.",
        { id: toastId },
      );
    } catch (error) {
      console.error("Lỗi Migration:", error);
      toast.error("Thất bại: Kiểm tra lại quyền ghi (Rules) trên Firebase.", {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-[#C9A63F]">
          Data Pumper <span className="text-white">v2.0</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Công cụ này sẽ đồng bộ file{" "}
          <code className="text-[#C9A63F]">mockProducts.ts</code>
          với <code className="text-[#C9A63F]">Firestore Database</code>. Mọi
          thay đổi về giá, tên, hay thư viện ảnh sẽ được cập nhật ngay lập tức.
        </p>

        <button
          onClick={handleUploadData}
          disabled={isUploading}
          className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-[#C9A63F] transition-all disabled:opacity-20"
        >
          {isUploading ? "Đang truyền dữ liệu..." : "Bắt đầu bơm dữ liệu"}
        </button>
      </div>
    </main>
  );
}
