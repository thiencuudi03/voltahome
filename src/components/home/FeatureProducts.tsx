import { mockProducts } from "@/data/mockProducts";
import ProductCard from "../product/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="relative z-10 py-20 px-6 md:px-20 bg-[#050505]">
      <div className="max-w-[1700px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            {/* SỬA: Giảm tracking từ [0.8em] xuống [0.3em] để chữ gọn và sang hơn */}
            <h4 className="text-[#C9A63F] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold opacity-60">
              Selected Tech
            </h4>

            {/* Giữ nguyên text-7xl đã tinh chỉnh ở bước trước */}
            <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              SẢN PHẨM <br />
              <span className="text-[#C9A63F]">TIÊU BIỂU</span>
            </h2>
          </div>

          <button
            suppressHydrationWarning
            className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.3em] hover:text-white transition-all pb-2 border-b border-white/10 mb-2 group shrink-0"
          >
            Khám phá tất cả{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {mockProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
