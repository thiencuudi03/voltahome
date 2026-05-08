import { mockProducts } from "@/data/mockProducts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatters";
import AddToCartButton from "@/components/product/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// 1. Cấu hình SEO động
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  // Ép kiểu String để so sánh chính xác tuyệt đối
  const product = mockProducts.find((p) => String(p.id) === String(id));

  return {
    title: product ? `${product.name} | VoltHome` : "Sản phẩm không tồn tại",
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  // 2. Giải nén ID từ params (Bắt buộc cho Next.js 15)
  const { id } = await params;

  // 3. Logic tìm kiếm an toàn: chuyển cả hai về String để so sánh
  const product = mockProducts.find((p) => String(p.id) === String(id));

  // 4. Nếu không tìm thấy sản phẩm trong mockProducts, trả về 404
  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] py-24 px-6 md:px-20 relative overflow-hidden">
      {/* Hiệu ứng ánh sáng nền Luxury */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A63F]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        {/* Breadcrumb bám sát báo cáo đồ án [cite: 89] */}
        <nav className="flex items-center space-x-4 mb-16 text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
          <Link href="/" className="hover:text-[#C9A63F] transition-colors">
            Trang chủ
          </Link>
          <span className="opacity-20">/</span>
          <Link
            href="/products"
            className="hover:text-[#C9A63F] transition-colors"
          >
            Bộ sưu tập
          </Link>
          <span className="opacity-20">/</span>
          <span className="text-white opacity-40">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* CỘT TRÁI: Hình ảnh sản phẩm (7/12 cột) */}
          <div className="lg:col-span-7">
            <div className="sticky top-32 group relative aspect-[4/5] bg-white/[0.02] border border-white/5 rounded-[4rem] overflow-hidden flex items-center justify-center p-10">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-contain p-12 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-10 left-10 text-[8px] uppercase tracking-[1em] text-white/10 vertical-text hidden md:block">
                VOLTHOME PREMIUM SELECTION
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Thông tin chi tiết (5/12 cột) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-[#C9A63F] text-xs uppercase tracking-[0.6em] font-bold">
                  {product.category}
                </p>
                <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                  {product.name}
                </h1>
                <div className="flex items-center gap-6 pt-4">
                  <span className="text-[#C9A63F] text-4xl font-serif italic">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="px-3 py-1 border border-white/10 rounded-full text-[9px] text-green-500 uppercase tracking-widest font-bold">
                    Còn hàng
                  </span>
                </div>
              </div>

              <div className="space-y-6 border-t border-white/5 pt-10">
                <h3 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">
                  Đặc điểm nổi bật
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-lg italic">
                  {product.description ||
                    "Tuyệt tác công nghệ hội tụ sự tinh giản và sức mạnh vượt trội."}
                </p>
              </div>

              {/* Grid thông số [cite: 19] */}
              <div className="grid grid-cols-2 gap-8 py-10 border-t border-white/5">
                <div className="space-y-1">
                  <span className="block text-gray-600 text-[9px] uppercase tracking-widest font-bold">
                    Vật liệu
                  </span>
                  <span className="text-white text-sm font-light uppercase tracking-wider">
                    Titanium / Glass
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-gray-600 text-[9px] uppercase tracking-widest font-bold">
                    Bảo hành
                  </span>
                  <span className="text-white text-sm font-light uppercase tracking-wider">
                    24 tháng chính hãng
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <AddToCartButton
                  product={product}
                  className="w-full sm:flex-1 py-6 bg-[#C9A63F] text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-full hover:bg-white transition-all duration-500"
                />
                <button className="w-full sm:w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors group">
                  <span className="group-hover:scale-125 transition-transform">
                    ♥
                  </span>
                </button>
              </div>

              <div className="pt-10 flex justify-between items-center opacity-20 border-t border-white/5">
                <div className="text-[8px] text-white uppercase tracking-widest">
                  Free Shipping Worldwide
                </div>
                <div className="text-[8px] text-white uppercase tracking-widest">
                  Secure Global Payment
                </div>
                <div className="text-[8px] text-white uppercase tracking-widest">
                  Official VoltHome Warranty
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
