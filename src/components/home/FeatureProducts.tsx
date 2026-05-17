"use client"; // Thêm dòng này để biến thành Client Component

import React, { useState, useEffect } from "react";
import { getFirebaseProducts } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

export default function FeatureProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu khi component được mount trên trình duyệt
    const fetchProducts = async () => {
      try {
        const data = await getFirebaseProducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-[#050505]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          Sản Phẩm <span className="text-[#C9A63F]">Nổi Bật</span>
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            {/* Hiệu ứng loading quay vòng màu vàng */}
            <div className="w-8 h-8 border-4 border-white/10 border-t-[#C9A63F] rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400">
            Chưa có sản phẩm nào trên hệ thống.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
