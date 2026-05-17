"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Danh sách danh mục với đường dẫn hình ảnh thực tế
const categories = [
  {
    id: 1,
    name: "iPhone",
    image: "/images/products/iphone-15.png",
    link: "/products?category=iphone",
  },
  {
    id: 2,
    name: "Macbook",
    image: "/images/products/macbook-m3.png",
    link: "/products?category=laptop",
  },
  {
    id: 3,
    name: "iPad",
    image: "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    link: "/products?category=tablet",
  },
  {
    id: 4,
    name: "Tai nghe",
    image: "/images/products/sony-wh1000xm5.png",
    link: "/products?category=audio",
  },
  {
    id: 5,
    name: "Bàn phím",
    image: "/images/products/keyboard-volt.png",
    link: "/products?category=accessory",
  },
  {
    id: 6,
    name: "Đồng hồ",
    image: "/images/products/contacts.png",
    link: "/products?category=watch",
  }, // Thay bằng ảnh đồng hồ nếu có
  {
    id: 7,
    name: "Phụ kiện",
    image: "/images/products/iphone-15-m4.png",
    link: "/products?category=accessory",
  },
  {
    id: 8,
    name: "SAMSUNG",
    image: "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
    link: "/products?category=samsung",
  },
];

export default function CategorySection() {
  return (
    <section className="py-12 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Tiêu đề danh mục nổi bật */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-wider">
            Danh mục <span className="text-[#C9A63F]">nổi bật</span>
          </h2>
          <Link
            href="/products"
            className="text-[#C9A63F] text-xs font-bold hover:text-white transition-colors"
          >
            XEM TẤT CẢ
          </Link>
        </div>

        {/* Lưới hiển thị danh mục (8 cột trên Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <motion.div key={cat.id} whileHover={{ y: -8 }} className="group">
              <Link
                href={cat.link}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0A0A0A] border border-white/5 group-hover:border-[#C9A63F]/30 group-hover:bg-[#111] transition-all duration-300 shadow-lg"
              >
                {/* Khung chứa hình ảnh */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Tên danh mục */}
                <span className="text-xs md:text-sm font-bold text-gray-400 group-hover:text-white text-center transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
