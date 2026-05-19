"use client";

import React, { useState, useEffect } from "react";
import {
  getFirebaseProducts,
  getFirebaseCategories,
} from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";
import { Sparkles, LayoutGrid, Filter, X } from "lucide-react";

export default function ModernProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999000000 }); // Max lớn để lấy hết
  const [isLoading, setIsLoading] = useState(true);

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
        console.error("Lỗi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShopData();
  }, []);

  // LOGIC LỌC KẾT HỢP DANH MỤC VÀ GIÁ
  const filteredProducts = products.filter((p) => {
    const catMatch =
      activeCategory === "all" ||
      p.category?.toLowerCase() === activeCategory.toLowerCase();
    const priceMatch =
      Number(p.price) >= priceRange.min && Number(p.price) <= priceRange.max;
    return catMatch && priceMatch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#C9A63F] font-black animate-pulse">
        ĐANG NẠP THIẾT BỊ...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            Tuyệt tác <span className="text-[#C9A63F]">Công nghệ</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* SIDEBAR BỘ LỌC */}
          <aside className="w-full md:w-64 space-y-8">
            {/* Lọc danh mục */}
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <LayoutGrid size={14} /> Danh mục
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`block w-full text-left text-sm font-bold ${activeCategory === "all" ? "text-[#C9A63F]" : "text-zinc-400 hover:text-white"}`}
                >
                  Tất cả
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`block w-full text-left text-sm font-bold ${activeCategory === cat.slug ? "text-[#C9A63F]" : "text-zinc-400 hover:text-white"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Lọc theo giá */}
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Filter size={14} /> Lọc theo giá
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => setPriceRange({ min: 0, max: 999000000 })}
                  className="block text-zinc-400 text-sm hover:text-white"
                >
                  Tất cả mức giá
                </button>
                <button
                  onClick={() => setPriceRange({ min: 0, max: 10000000 })}
                  className="block text-zinc-400 text-sm hover:text-[#C9A63F]"
                >
                  Dưới 10 triệu
                </button>
                <button
                  onClick={() =>
                    setPriceRange({ min: 10000000, max: 25000000 })
                  }
                  className="block text-zinc-400 text-sm hover:text-[#C9A63F]"
                >
                  10 - 25 triệu
                </button>
                <button
                  onClick={() =>
                    setPriceRange({ min: 25000000, max: 999000000 })
                  }
                  className="block text-zinc-400 text-sm hover:text-[#C9A63F]"
                >
                  Trên 25 triệu
                </button>
              </div>
            </div>
          </aside>

          {/* GRID SẢN PHẨM */}
          <section className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-white/5 rounded-2xl">
                <p className="text-zinc-500 font-bold uppercase tracking-widest">
                  Không tìm thấy thiết bị phù hợp.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
