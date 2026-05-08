// Trang chi tiết sản phẩm

import { mockProducts } from "@/data/mockProducts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatters";
import AddToCartButton from "@/components/product/AddToCartButton";
import { ArrowLeft, ShieldCheck, Truck, Globe } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => String(p.id) === String(id));
  return {
    title: product ? `${product.name} | VoltHome` : "Sản phẩm không tồn tại",
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => String(p.id) === String(id));

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#050505] py-24 px-6 md:px-20 relative overflow-hidden">
      {/* Aura illumination tạo chiều sâu cao cấp */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A63F]/10 blur-[180px] rounded-full -mr-96 -mt-96 pointer-events-none" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        {/* Navigation tinh tế */}
        <div className="flex justify-between items-center mb-20">
          <Link
            href="/products"
            className="group flex items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] hover:text-[#C9A63F] transition-all"
          >
            <ArrowLeft
              size={14}
              className="mr-3 group-hover:-translate-x-2 transition-transform"
            />
            Quay lại bộ sưu tập
          </Link>
          <div className="text-[9px] text-white/20 uppercase tracking-[0.6em] font-bold hidden md:block">
            VoltHome / Product / {product.id}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          {/* CỘT TRÁI: Showcase hình ảnh (7/12 cột) */}
          <div className="lg:col-span-7">
            <div className="sticky top-32 group relative aspect-[4/5] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[5rem] overflow-hidden flex items-center justify-center p-12">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-contain p-16 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-12 right-12">
                <span className="px-5 py-2 border border-[#C9A63F]/30 rounded-full text-[9px] text-[#C9A63F] uppercase tracking-widest font-black bg-[#C9A63F]/5">
                  Limited Edition
                </span>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Nội dung (5/12 cột) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-16">
              {/* Name & Price */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="h-[1px] w-12 bg-[#C9A63F]/40"></span>
                  <p className="text-[#C9A63F] text-[10px] uppercase tracking-[0.5em] font-black">
                    {product.category}
                  </p>
                </div>
                <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-6">
                  <span className="text-[#C9A63F] text-5xl font-serif italic">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-gray-600 text-[10px] uppercase tracking-widest line-through decoration-[#C9A63F]/30">
                    {formatCurrency(product.price * 1.2)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-8 border-t border-white/5 pt-12">
                <h3 className="text-white text-[11px] uppercase tracking-[0.4em] font-bold opacity-40">
                  Mô tả tinh phẩm
                </h3>
                <p className="text-gray-400 font-light leading-[1.8] text-xl italic font-serif">
                  {product.description ||
                    "Một tuyệt tác công nghệ hội tụ sự tinh giản và sức mạnh vượt trội, được thiết kế để nâng tầm trải nghiệm cá nhân của bạn."}
                </p>
              </div>

              {/* Specs & Actions */}
              <div className="space-y-12">
                <div className="grid grid-cols-2 gap-10">
                  <div className="flex gap-4">
                    <ShieldCheck
                      size={20}
                      className="text-[#C9A63F] shrink-0"
                    />
                    <div>
                      <span className="block text-white text-[10px] font-black uppercase tracking-widest">
                        Bảo hành
                      </span>
                      <span className="text-gray-500 text-xs font-light tracking-wide">
                        24 Tháng Chính Hãng
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Truck size={20} className="text-[#C9A63F] shrink-0" />
                    <div>
                      <span className="block text-white text-[10px] font-black uppercase tracking-widest">
                        Vận chuyển
                      </span>
                      <span className="text-gray-500 text-xs font-light tracking-wide">
                        Premium Express
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center pt-6">
                  <AddToCartButton
                    product={product}
                    className="w-full sm:flex-1 py-7 bg-[#C9A63F] text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-white transition-all duration-500 shadow-[0_20px_50px_rgba(201,166,63,0.15)]"
                  />
                  <button className="w-full sm:w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 group">
                    <span className="group-hover:scale-125 transition-transform">
                      ♥
                    </span>
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="pt-12 flex justify-between items-center opacity-30 border-t border-white/5">
                <div className="flex items-center gap-2 text-[8px] text-white uppercase tracking-widest font-bold">
                  <Globe size={10} /> Worldwide Delivery
                </div>
                <div className="h-4 w-[1px] bg-white/20"></div>
                <div className="text-[8px] text-white uppercase tracking-widest font-bold">
                  Secure Payment
                </div>
                <div className="h-4 w-[1px] bg-white/20"></div>
                <div className="text-[8px] text-white uppercase tracking-widest font-bold">
                  VoltHome Authentic
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
