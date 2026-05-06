import { mockProducts } from "@/data/mockProducts";
import ProductCard from "../product/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="px-6 md:px-20 bg-[#050505]">
      {/* Dàn trang tối đa 1700px để tạo độ rộng "thênh thang" */}
      <div className="max-w-[1700px] mx-auto">
        {/* Header của Section: Tăng mb-32 để tách biệt hẳn với lưới sản phẩm */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
          <div className="space-y-6">
            <h4 className="text-[#C9A63F] text-xs uppercase tracking-[0.8em] font-bold opacity-50">
              Selected Tech
            </h4>
            <h2 className="text-white text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
              SẢN PHẨM <br />
              <span className="text-[#C9A63F]">TIÊU BIỂU</span>
            </h2>
          </div>
          <button className="text-gray-500 text-xs uppercase tracking-[0.5em] hover:text-white transition-all pb-2 border-b border-white/10 mb-4 group">
            Khám phá tất cả{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </button>
        </div>

        {/* Lưới Grid: gap-y-40 đảm bảo hàng trên và hàng dưới cách xa nhau cực thoải mái */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-40">
          {mockProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
