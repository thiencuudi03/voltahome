// src/app/(shop)/products/[id]/page.tsx
// Trang chi tiết sản phẩm - Tích hợp AddToCartButton và Formatters

import { mockProducts } from "@/data/mockProducts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatters"; // Sử dụng formatter chuẩn
import AddToCartButton from "@/components/product/AddToCartButton"; // Tích hợp nút Client Component

// Next.js 15 yêu cầu params phải là một Promise
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Cấu hình Metadata động cho SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  return {
    title: product ? `${product.name} | VoltHome` : "Sản phẩm không tồn tại",
    description:
      product?.description ||
      "Chi tiết sản phẩm điện máy cao cấp tại VoltHome.",
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  // Giải nén id từ params (Bắt buộc với Next.js 15)
  const { id } = await params;

  // Tìm sản phẩm trong dữ liệu mock
  const product = mockProducts.find((p) => p.id === id);

  // Nếu không tìm thấy, trả về trang 404 đã có sẵn
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb đơn giản */}
      <nav className="text-sm mb-8 text-gray-500 uppercase tracking-wider">
        <Link href="/" className="hover:text-black transition-colors">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-black transition-colors">
          Sản phẩm
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Hình ảnh sản phẩm với hiệu ứng Luxury */}
        <div className="relative aspect-square bg-[#F5F5F5] rounded-2xl overflow-hidden group border border-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-12 transition-transform duration-700 group-hover:scale-110"
            priority
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
            {product.name}
          </h1>

          {/* Hiển thị giá tiền đã qua định dạng formatter */}
          <p className="text-3xl font-bold text-[#D4AF37] mb-8">
            {formatCurrency(product.price)}
          </p>

          <div className="border-t border-b border-gray-100 py-8 mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">
              Mô tả sản phẩm
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description ||
                "Mô tả sản phẩm đang được cập nhật cho dự án VoltHome. Sản phẩm đảm bảo chất lượng cao cấp và thiết kế tinh tế."}
            </p>
          </div>

          <div className="flex gap-4">
            {/* Tích hợp nút AddToCartButton đã tạo */}
            <AddToCartButton
              product={product}
              className="flex-1 text-lg py-5 uppercase tracking-widest shadow-xl shadow-black/10"
              showIcon={true}
            />

            <button
              className="px-8 py-5 border border-black rounded-lg hover:bg-gray-50 transition-all active:scale-95"
              aria-label="Thêm vào yêu thích"
            >
              ♥
            </button>
          </div>

          {/* Thông tin thêm */}
          <div className="mt-12 space-y-4 border-t border-gray-100 pt-8">
            <div className="flex items-center text-sm">
              <span className="w-32 text-gray-400 uppercase font-bold tracking-widest text-[10px]">
                Danh mục:
              </span>
              <span className="text-black font-medium">{product.category}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-32 text-gray-400 uppercase font-bold tracking-widest text-[10px]">
                Tình trạng:
              </span>
              <span className="text-green-600 font-bold">● Còn hàng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
