"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  getFirebaseProducts,
  getFirebaseCategories,
} from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";
import { LayoutGrid, Filter, Search } from "lucide-react";

// 1. Component nội dung chính
function ModernProductsContent() {
  const searchParams = useSearchParams();
  const queryFromHeader = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999000000 });
  const [searchQuery, setSearchQuery] = useState(queryFromHeader);
  const [isLoading, setIsLoading] = useState(true);

  // Cập nhật search khi URL từ Header thay đổi
  useEffect(() => {
    setSearchQuery(queryFromHeader);
  }, [queryFromHeader]);

  // Fetch dữ liệu duy nhất 1 lần khi component mount
  useEffect(() => {
    const fetchShopData = async () => {
      setIsLoading(true);
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getFirebaseProducts(),
          getFirebaseCategories(),
        ]);
        setProducts(fetchedProducts || []);
        setCategories(fetchedCategories || []);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShopData();
  }, []);

  // LOGIC LỌC TỐI ƯU HÓA (Dùng useMemo để không bị reset khi nhấn Like)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const pName = (p.name || "").toLowerCase();
      const pCategory = (p.category || "").toLowerCase();
      const pPrice = Number(p.price) || 0;

      const catMatch =
        activeCategory === "all" || pCategory === activeCategory.toLowerCase();
      const priceMatch = pPrice >= priceRange.min && pPrice <= priceRange.max;
      const searchMatch = pName.includes(searchQuery.toLowerCase());

      return catMatch && priceMatch && searchMatch;
    });
  }, [products, activeCategory, priceRange, searchQuery]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Đang nạp thiết bị...
      </div>
    );

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* THANH TÌM KIẾM */}
        <div className="mb-12 relative max-w-2xl mx-auto">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm tuyệt tác công nghệ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-full py-4 pl-12 pr-6 text-white outline-none focus:border-[#C9A63F]"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar lọc */}
          <aside className="w-full md:w-64 space-y-8">
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <LayoutGrid size={14} /> Danh mục
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`block w-full text-left text-sm font-bold ${
                    activeCategory === "all"
                      ? "text-[#C9A63F]"
                      : "text-zinc-400"
                  }`}
                >
                  Tất cả
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`block w-full text-left text-sm font-bold ${
                      activeCategory === cat.slug
                        ? "text-[#C9A63F]"
                        : "text-zinc-400"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Filter size={14} /> Lọc theo giá
              </h4>
              <div className="space-y-3 text-zinc-400 text-sm">
                <button
                  onClick={() => setPriceRange({ min: 0, max: 999000000 })}
                  className="block hover:text-white"
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setPriceRange({ min: 0, max: 10000000 })}
                  className="block hover:text-white"
                >
                  Dưới 10 triệu
                </button>
                <button
                  onClick={() =>
                    setPriceRange({ min: 10000000, max: 25000000 })
                  }
                  className="block hover:text-white"
                >
                  10 - 25 triệu
                </button>
                <button
                  onClick={() =>
                    setPriceRange({ min: 25000000, max: 999000000 })
                  }
                  className="block hover:text-white"
                >
                  Trên 25 triệu
                </button>
              </div>
            </div>
          </aside>

          {/* Grid hiển thị sản phẩm */}
          <section className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-white/5 rounded-2xl">
                <p className="text-zinc-500 font-bold">
                  Không tìm thấy sản phẩm nào khớp với "{searchQuery}"
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

// 2. Wrap trong Suspense
export default function ModernProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
          Đang tải...
        </div>
      }
    >
      <ModernProductsContent />
    </Suspense>
  );
}
