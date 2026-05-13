"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ChevronRight,
  ShoppingCart,
  ShieldCheck,
  Star,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Settings,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

// --- IMPORT FIREBASE ---
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State để quản lý ảnh nào đang được chọn làm ảnh lớn
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);

    // Hàm gọi dữ liệu 1 sản phẩm cụ thể từ Firebase
    const fetchProductDetail = async () => {
      try {
        if (typeof params.id === "string") {
          const docRef = doc(db, "products", params.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = { id: docSnap.id, ...docSnap.data() } as Product;
            setProduct(data);
            setMainImage(data.image); // Đặt ảnh chính ban đầu
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#C9A63F] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white space-y-6">
        <h1 className="text-4xl font-black uppercase tracking-widest text-gray-700">
          Không tìm thấy sản phẩm
        </h1>
        <Link
          href="/products"
          className="text-[#C9A63F] border-b border-[#C9A63F] pb-1 uppercase text-sm font-bold"
        >
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  // TẠM THỜI: Tạo mảng 3 ảnh giống nhau để làm Giao diện Gallery.
  // Sau này khi database có nhiều ảnh, bạn chỉ cần thay bằng: product.images
  const galleryImages = [product.image, product.image, product.image];

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);
  const oldPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price * 1.15);

  const renderSpecs = () => {
    const specs =
      product.category === "Laptop"
        ? [
            { label: "Vi xử lý", value: "Tùy chọn cao cấp" },
            { label: "RAM", value: "Khởi điểm 16GB" },
            { label: "Lưu trữ", value: "SSD NVMe 512GB" },
            { label: "Màn hình", value: "OLED 120Hz" },
          ]
        : product.category === "Điện thoại"
          ? [
              { label: "Màn hình", value: "LTPO 120Hz" },
              { label: "Camera", value: "Hệ thống đa ống kính" },
              { label: "Pin", value: "Sạc nhanh siêu tốc" },
              { label: "Chất liệu", value: "Titan/Kính" },
            ]
          : [
              { label: "Kết nối", value: "Bluetooth 5.3" },
              { label: "Thiết kế", value: "Ergonomic & Minimalist" },
              { label: "Tương thích", value: "Đa nền tảng" },
              { label: "Bảo hành", value: "Chính hãng 24 tháng" },
            ];

    return (
      <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 mt-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#C9A63F] mb-6 flex items-center gap-2">
          <Settings size={16} /> Thông số kỹ thuật
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 border-b border-white/5 pb-2"
            >
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                {spec.label}
              </span>
              <span className="text-sm text-gray-300 font-light">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* ĐIỀU HƯỚNG */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-10">
          <Link href="/" className="hover:text-[#C9A63F]">
            Trang chủ
          </Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-[#C9A63F]">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#C9A63F] truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* CỘT TRÁI: HÌNH ẢNH & GALLERY */}
          <div className="lg:col-span-5 space-y-6">
            {/* Ảnh chính (Hiển thị dựa theo state mainImage) */}
            <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 p-12 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-[#C9A63F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-full h-full">
                <Image
                  src={mainImage} // Sử dụng state
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all duration-300"
                />
              </div>
            </div>

            {/* Gallery: 3 ảnh thu nhỏ */}
            <div className="flex gap-4 justify-center">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)} // Click đổi ảnh chính
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-[#0A0A0A] p-3 transition-all duration-300 ${
                    mainImage === img
                      ? "border-2 border-[#C9A63F] opacity-100"
                      : "border border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Gallery ${index}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: NỘI DUNG SẢN PHẨM */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#C9A63F]/10 border border-[#C9A63F]/20 rounded text-[10px] font-bold text-[#C9A63F] uppercase tracking-widest">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-white">
                {product.name}
              </h1>
              <p className="text-gray-400 font-light leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center text-[#C9A63F] gap-1">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">{product.rating || "4.9"}</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">
                  Đã bán <strong className="text-white ml-1">850+</strong>
                </span>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col gap-2">
              <div className="flex items-end gap-4">
                <span className="text-5xl font-bold text-[#C9A63F]">
                  {formattedPrice}
                </span>
                <span className="text-lg text-gray-600 line-through mb-1">
                  {oldPrice}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                Giá đã bao gồm thuế VAT và bảo hành chính hãng
              </p>
            </div>

            <div className="p-4 border border-dashed border-[#C9A63F]/30 bg-[#C9A63F]/5 rounded-xl space-y-2">
              <p className="text-xs font-bold text-[#C9A63F] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C9A63F] rounded-full animate-ping" />{" "}
                Ưu đãi độc quyền
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4 list-disc">
                <li>Giảm ngay 500.000đ khi thanh toán qua thẻ tín dụng</li>
                <li>Tặng kèm bao da cao cấp trị giá 1.200.000đ</li>
              </ul>
            </div>

            {renderSpecs()}

            <div className="flex items-center gap-8 pt-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Số lượng
              </span>
              <div className="flex items-center bg-[#0A0A0A] border border-white/10 rounded-full px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-gray-400 hover:text-white"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-gray-400 hover:text-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product);
                  alert("Đã thêm vào giỏ hàng!");
                }}
                className="flex-[4] flex items-center justify-center gap-3 border-2 border-[#C9A63F] text-[#C9A63F] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#C9A63F] hover:text-black transition-all"
              >
                <ShoppingCart size={18} /> Thêm vào giỏ
              </button>
              <Link
                href="/checkout"
                className="flex-[6] bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#C9A63F] transition-all flex items-center justify-center"
              >
                Mua ngay
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw size={20} className="text-gray-500" />
                <span className="text-[9px] uppercase font-bold text-gray-600">
                  30 ngày đổi trả
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck size={20} className="text-gray-500" />
                <span className="text-[9px] uppercase font-bold text-gray-600">
                  Bảo hành 2 năm
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={20} className="text-gray-500" />
                <span className="text-[9px] uppercase font-bold text-gray-600">
                  Giao hàng miễn phí
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
