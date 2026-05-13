"use client";

import SortDropdown from "@/components/product/SortDropdown";
import React, { useState, useEffect, Suspense } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// --- IMPORT FIREBASE VÀ KIỂU DỮ LIỆU ---
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

const CATEGORIES = [
  "Tất cả",
  "Laptop",
  "Điện thoại",
  "Phụ kiện",
  "Thiết bị SmartHome",
];

const PRICE_RANGES = [
  { label: "Tất cả mức giá", min: 0, max: Infinity },
  { label: "Dưới 20 triệu", min: 0, max: 20000000 },
  { label: "20 - 40 triệu", min: 20000000, max: 40000000 },
  { label: "40 - 60 triệu", min: 40000000, max: 60000000 },
  { label: "Trên 60 triệu", min: 60000000, max: Infinity },
];

function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
  const [sortOption, setSortOption] = useState("Mặc định");
  const [isMounted, setIsMounted] = useState(false);

  // --- THÊM STATE ĐỂ LƯU DỮ LIỆU TỪ FIREBASE ---
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const queryParam = searchParams.get("q") || "";
  const [localSearch, setLocalSearch] = useState(queryParam);

  // --- HÀM LẤY DỮ LIỆU TỪ FIREBASE ---
  useEffect(() => {
    setIsMounted(true);
    setLocalSearch(queryParam);

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productsData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [queryParam]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val.trim()) params.set("q", val.trim());
    else params.delete("q");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // --- SỬA LẠI LOGIC LỌC (Dùng state products thay vì mockProducts) ---
  const filteredProducts = products
    .filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(localSearch.toLowerCase());
      const matchCategory =
        selectedCategory === "Tất cả" || product.category === selectedCategory;
      const matchPrice =
        product.price >= selectedPrice.min &&
        product.price <= selectedPrice.max;
      return matchSearch && matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sortOption === "Giá thấp - cao") return a.price - b.price;
      if (sortOption === "Giá cao - thấp") return b.price - a.price;
      return 0;
    });

  if (!isMounted) return null;

  return (
    <div className="max-w-[1700px] mx-auto relative z-10">
      {/* Tiêu đề trang (Giữ nguyên) */}
      <div className="mb-20 pb-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-3">
          <p className="text-[#C9A63F] text-xs uppercase tracking-[0.6em] font-bold opacity-60">
            Bộ sưu tập thiết bị
          </p>
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            CÔNG NGHỆ <br /> <span className="text-[#C9A63F]">TỐI GIẢN</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Sidebar Bộ lọc (Giữ nguyên) */}
        <aside className="w-full lg:w-1/4 space-y-16 lg:sticky lg:top-32 self-start">
          {/* ... (Giữ nguyên mã của Sidebar tìm kiếm, danh mục, giá) ... */}
          {/* Để tiết kiệm không gian, tôi thu gọn phần này, bạn giữ nguyên code cũ nhé */}
          <div className="space-y-6">
            <h3 className="text-white text-[11px] uppercase tracking-[0.4em] font-bold">
              Tìm kiếm
            </h3>
            <input
              type="text"
              value={localSearch}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm kiệt tác..."
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-full py-4 px-6 text-sm text-white focus:border-[#C9A63F] outline-none transition-all"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-white text-[11px] uppercase tracking-[0.4em] font-bold">
              Danh mục
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs transition-all ${selectedCategory === cat ? "bg-[#C9A63F] text-black font-bold" : "bg-white/5 text-gray-500 hover:text-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-white text-[11px] uppercase tracking-[0.4em] font-bold">
              Mức giá
            </h3>
            <ul className="space-y-3">
              {PRICE_RANGES.map((range) => (
                <li key={range.label}>
                  <button
                    onClick={() => setSelectedPrice(range)}
                    className={`text-sm transition-all ${selectedPrice.label === range.label ? "text-[#C9A63F] font-bold" : "text-gray-500 hover:text-white"}`}
                  >
                    {range.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Danh sách sản phẩm */}
        <div className="w-full lg:w-3/4 space-y-10">
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <p className="text-gray-500 italic text-sm">
              {isLoading
                ? "Đang kết nối kho dữ liệu..."
                : `Hiển thị ${filteredProducts.length} kết quả`}
            </p>
            <SortDropdown onSortChange={setSortOption} />
          </div>

          {/* Hiệu ứng Loading khi đang chờ dữ liệu */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-white/10 border-t-[#C9A63F] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))
              ) : (
                <p className="text-gray-500 col-span-full">
                  Không tìm thấy sản phẩm nào.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ModernProductsPage() {
  return (
    <main className="min-h-screen bg-[#050505] py-20 px-6 md:px-20 relative overflow-hidden">
      <Suspense fallback={<div className="text-[#C9A63F]">Đang tải...</div>}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
