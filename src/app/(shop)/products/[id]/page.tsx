//Trang chi tiết sp
import { mockProducts } from "@/data/mockProducts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Next.js 15 yêu cầu params phải là một Promise
interface ProductPageProps {
  params: Promise<{ id: string }>;
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
      <nav className="text-sm mb-8 text-gray-500">
        <Link href="/" className="hover:text-black">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-black">
          Sản phẩm
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Hình ảnh sản phẩm */}
        <div className="relative aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-[#D4AF37] mb-6">
            {product.price.toLocaleString("vi-VN")}₫
          </p>

          <div className="border-t border-b border-gray-100 py-6 mb-8">
            <p className="text-gray-600 leading-relaxed">
              {product.description ||
                "Mô tả sản phẩm đang được cập nhật cho dự án VoltHome. Sản phẩm đảm bảo chất lượng cao cấp và thiết kế tinh tế."}
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors active:scale-[0.98]">
              Thêm vào giỏ hàng
            </button>
            <button className="px-6 py-4 border border-black rounded-lg hover:bg-gray-50 transition-colors">
              ♥
            </button>
          </div>

          {/* Thông tin thêm */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-24">Danh mục:</span>
              <span className="text-black">{product.category}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-24">Tình trạng:</span>
              <span className="text-green-600 font-medium">Còn hàng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
