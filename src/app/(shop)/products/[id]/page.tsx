"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
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
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

// --- IMPORT FIREBASE ---
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

// Component FavoriteButton đã được cập nhật logic
import FavoriteButton from "@/components/product/FavoriteButton";

export default function ProductDetailPage() {
  const params = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const { isLoading: isAuthLoading } = useAuthStore();
  const detailRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Logic Gallery
  const [currentIndex, setCurrentIndex] = useState(0);

  // Logic Thu gọn cho phần CHI TIẾT BÊN DƯỚI
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetail = async () => {
      try {
        if (typeof params.id === "string") {
          const docRef = doc(db, "products", params.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = { id: docSnap.id, ...docSnap.data() } as Product;
            setProduct(data);
            setCurrentIndex(0);
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

  // Chờ cả dữ liệu sản phẩm và dữ liệu xác thực tải xong, tránh đứt gãy session
  if (isLoading || isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#C9A63F] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-400">
        Sản phẩm không tồn tại hoặc đã bị gỡ bỏ.
      </div>
    );
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // --- HÀM HIỂN THỊ MÔ TẢ XEN KẼ ---
  const renderDetailedDescription = () => {
    if (!product.descriptionData || product.descriptionData.length === 0)
      return null;

    const displayData = isExpanded
      ? product.descriptionData
      : product.descriptionData.slice(0, 2);

    return (
      <div
        id="details-section"
        ref={detailRef}
        className="mt-32 pt-20 border-t border-white/5 pb-20"
      >
        <h2 className="text-[#C9A63F] text-[10px] font-bold uppercase tracking-[0.25em] mb-20 text-center">
          — Tuyệt tác công nghệ —
        </h2>

        <div className="max-w-4xl mx-auto space-y-24 relative">
          {displayData.map((item, index) => (
            <div
              key={index}
              className="w-full animate-in fade-in slide-in-from-bottom-10 duration-1000"
            >
              {item.type === "image" && item.url ? (
                <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0A0A0A]">
                  <Image
                    src={item.url.trim().replace(/['"]/g, "")}
                    alt={`Detail ${index}`}
                    width={1200}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              ) : (
                item.content &&
                item.content.trim() !== "" && (
                  <div className="px-10 md:px-20">
                    <p className="text-gray-400 text-xl md:text-2xl font-extralight leading-relaxed text-center italic">
                      {item.content}
                    </p>
                  </div>
                )
              )}
            </div>
          ))}

          {!isExpanded && product.descriptionData.length > 2 && (
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />
          )}
        </div>

        {product.descriptionData.length > 2 && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => {
                if (isExpanded) {
                  detailRef.current?.scrollIntoView({ behavior: "smooth" });
                }
                setIsExpanded(!isExpanded);
              }}
              className="px-10 py-4 border border-[#C9A63F]/40 text-[#C9A63F] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#C9A63F] hover:text-black transition-all rounded-full"
            >
              {isExpanded
                ? "— Thu gọn nội dung"
                : `+ Khám phá thêm ${product.descriptionData.length - 2} chi tiết`}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20 notranslate">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-10 italic">
          <Link href="/" className="hover:text-[#C9A63F]">
            Trang chủ
          </Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-[#C9A63F]">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#C9A63F]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* CỘT TRÁI: GALLERY */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="aspect-square w-full rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 p-8 flex items-center justify-center relative group">
              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[currentIndex].trim().replace(/['"]/g, "")}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_50px_rgba(201,166,63,0.15)] transition-all duration-700"
                />
              </div>

              <div className="absolute bottom-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest text-[#C9A63F] z-10">
                {currentIndex + 1} / {galleryImages.length}
              </div>

              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? galleryImages.length - 1 : prev - 1,
                  )
                }
                className="absolute left-4 p-3 rounded-full bg-black/40 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#C9A63F] hover:text-black z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === galleryImages.length - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-4 p-3 rounded-full bg-black/40 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#C9A63F] hover:text-black z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative min-w-[80px] h-[80px] rounded-xl overflow-hidden bg-[#0A0A0A] transition-all duration-500 shrink-0 ${
                    currentIndex === index
                      ? "border-2 border-[#C9A63F] scale-105"
                      : "border border-white/10 opacity-40 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.trim().replace(/['"]/g, "")}
                    alt="thumb"
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: INFO */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#C9A63F]/10 border border-[#C9A63F]/20 rounded text-[10px] font-bold text-[#C9A63F] uppercase tracking-widest">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter text-white uppercase italic">
                {product.name}
              </h1>

              <div className="relative border-l border-[#C9A63F]/30 pl-6 py-1">
                <p className="text-gray-400 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm pt-2">
                <div className="flex items-center text-[#C9A63F] gap-1">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">{product.rating || "4.9"}</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">
                  Đã bán <strong className="text-white ml-1">1.2k+</strong>
                </span>
              </div>
            </div>

            {/* GIÁ CẢ */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex items-end gap-4 shadow-2xl">
              <span className="text-5xl font-black text-[#C9A63F] tracking-tighter">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </span>
              <span className="text-lg text-gray-700 line-through font-light mb-1">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price * 1.15)}
              </span>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-6 flex items-center gap-3">
                <Settings size={14} className="text-[#C9A63F]" /> Thông số kỹ
                thuật
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-600 uppercase text-[9px] font-bold">
                    Vi xử lý
                  </span>
                  <span className="font-light text-gray-300">
                    Apple Silicon cao cấp
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-600 uppercase text-[9px] font-bold">
                    Lưu trữ
                  </span>
                  <span className="font-light text-gray-300">
                    SSD NVMe Siêu tốc
                  </span>
                </div>
              </div>
            </div>

            {/* SỐ LƯỢNG & NÚT TƯƠNG TÁC */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 pt-4">
              <div className="flex items-center bg-[#0A0A0A] border border-white/10 rounded-full px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-4 text-gray-500 hover:text-[#C9A63F] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-4 text-gray-500 hover:text-[#C9A63F] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => {
                  addItem(product, quantity);
                  toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ!`, {
                    position: "bottom-right",
                  });
                }}
                className="flex-1 flex items-center justify-center gap-4 bg-[#C9A63F] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_30px_rgba(201,166,63,0.2)]"
              >
                <ShoppingCart size={18} /> Thêm vào giỏ hàng
              </button>

              {/* Nút Yêu Thích */}
              <div className="flex items-center justify-center scale-125 ml-2">
                {/* ĐÃ SỬA: Chuyền nguyên cục product vào đây */}
                <FavoriteButton product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* PHẦN MÔ TẢ CHI TIẾT */}
        {renderDetailedDescription()}
      </div>
    </main>
  );
}
