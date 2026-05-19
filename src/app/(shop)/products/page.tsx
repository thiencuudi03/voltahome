"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getFirebaseProducts,
  getFirebaseCategories,
} from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";
import { Sparkles, LayoutGrid } from "lucide-react";

export default function ModernProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Kéo toàn bộ dữ liệu thật từ Firebase về khi trang vừa mở
  useEffect(() => {
    const fetchShopData = async () => {
      setIsLoading(true);
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getFirebaseProducts(),
          getFirebaseCategories(),
        ]);
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cửa hàng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopData();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase(),
        );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/5 border-t-[#C9A63F] rounded-full animate-spin"></div>
        <p className="text-[#C9A63F] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Đang đồng bộ kho thiết bị...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20 relative">
      {/* Hiệu ứng Background ánh vàng Luxury */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C9A63F]/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* HEADER TRANG SẢN PHẨM */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A63F]/10 border border-[#C9A63F]/20 text-[#C9A63F] text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={14} /> Bộ sưu tập giới hạn
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            Tuyệt tác <span className="text-[#C9A63F]">Công nghệ</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-2xl mx-auto font-medium">
            Khám phá những thiết bị cao cấp nhất được tuyển chọn gắt gao, mang
            đến trải nghiệm đột phá và phong cách sống thượng lưu cho bạn.
          </p>
        </div>

        {/* THANH ĐIỀU HƯỚNG DANH MỤC */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
              activeCategory === "all"
                ? "bg-[#C9A63F] text-black shadow-[0_0_20px_rgba(201,166,63,0.3)]"
                : "bg-[#0A0A0A] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
            }`}
          >
            <LayoutGrid size={16} /> Tất cả thiết bị
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug || cat.name)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                activeCategory === (cat.slug || cat.name)
                  ? "bg-[#C9A63F] text-black shadow-[0_0_20px_rgba(201,166,63,0.3)]"
                  : "bg-[#0A0A0A] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
              }`}
            >
              <span className="text-base">{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* GRID SẢN PHẨM HOẶC TRẠNG THÁI TRỐNG */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#0A0A0A] border border-white/5 rounded-[2.5rem]">
            <p className="text-zinc-500 text-lg font-bold uppercase tracking-widest">
              Không tìm thấy thiết bị nào trong danh mục này.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="animate-in fade-in zoom-in-95 duration-500"
              >
                {/* ĐÃ SỬA CHUẨN: Truyền nguyên object product vào ProductCard 
                  để bên trong ProductCard có thể truyền tiếp vào FavoriteButton 
                */}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
