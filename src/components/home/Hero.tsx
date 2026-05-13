"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dữ liệu cho Slider chính
const slides = [
  {
    id: 1,
    title: "ĐẶC QUYỀN MACBOOK",
    subtitle: "GIẢM THẲNG 5 TRIỆU",
    desc: "Tặng kèm Office 365 & Balo cao cấp. Trả góp 0% qua thẻ tín dụng.",
    image: "/images/products/macbook-m3.png",
    link: "/products",
    bgColor: "from-gray-900 to-black",
  },
  {
    id: 2,
    title: "SAMSUNG GALAXY S24",
    subtitle: "THU CŨ ĐỔI MỚI",
    desc: "Trợ giá lên đời đến 3 triệu. Tặng ốp lưng & củ sạc 45W chính hãng.",
    image: "/images/products/Samsung Galaxy S24 Ultra - Gray.png", // Bạn có thể thay đường dẫn ảnh thực tế
    link: "/products",
    bgColor: "from-[#0a0a0a] to-[#1a1a1a]",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 giây đổi ảnh 1 lần
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="pt-28 pb-8 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        {/* LƯỚI BỐ CỤC CHUẨN FPT SHOP (1 TO - 2 NHỎ) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* CỘT TRÁI: MAIN SLIDER (Chiếm 8 phần) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 to-black border border-white/10 aspect-[16/9] md:aspect-[2/1] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center"
              >
                <div className="w-1/2 p-8 md:p-12 z-10">
                  <span className="inline-block py-1 px-3 bg-[#C9A63F]/20 text-[#C9A63F] border border-[#C9A63F]/50 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                    Flash Sale
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic leading-tight mb-2">
                    {slides[currentSlide].title}
                  </h2>
                  <h3 className="text-2xl md:text-4xl font-black text-[#C9A63F] mb-4">
                    {slides[currentSlide].subtitle}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base hidden md:block mb-8">
                    {slides[currentSlide].desc}
                  </p>
                  <Link
                    href={slides[currentSlide].link}
                    className="inline-block px-8 py-3 bg-[#C9A63F] text-black font-bold uppercase text-xs rounded-lg hover:bg-white transition-colors shadow-[0_0_20px_rgba(201,166,63,0.3)]"
                  >
                    Mua ngay
                  </Link>
                </div>

                <div className="w-1/2 h-full relative">
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-contain p-4 md:p-8 scale-110 drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nút điều hướng Slider */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-[#C9A63F] text-white hover:text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-md"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-[#C9A63F] text-white hover:text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-md"
            >
              <ChevronRight size={24} />
            </button>

            {/* Chấm tròn (Dots) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? "w-6 bg-[#C9A63F]"
                      : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: 2 BANNER PHỤ (Chiếm 4 phần) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Banner Phụ 1 */}
            <div className="flex-1 rounded-2xl bg-[#0A0A0A] border border-white/10 p-6 flex flex-col justify-center relative overflow-hidden group hover:border-[#C9A63F]/50 transition-colors">
              <div className="relative z-10 w-2/3">
                <span className="text-[#C9A63F] text-[10px] font-bold uppercase tracking-wider block mb-1">
                  Đại tiệc âm thanh
                </span>
                <h4 className="text-xl font-black text-white mb-2">
                  SONY WH-1000XM5
                </h4>
                <p className="text-gray-400 text-xs mb-4">
                  Giá hủy diệt chỉ từ 6.990.000đ
                </p>
                <Link
                  href="/products"
                  className="text-xs font-bold text-white hover:text-[#C9A63F] flex items-center gap-1"
                >
                  Xem chi tiết <ChevronRight size={14} />
                </Link>
              </div>
              <div className="absolute right-[-20%] bottom-[-20%] w-[60%] h-[120%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="/images/products/sony-wh1000xm5.png"
                  alt="Sony"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Banner Phụ 2 */}
            <div className="flex-1 rounded-2xl bg-[#0A0A0A] border border-white/10 p-6 flex flex-col justify-center relative overflow-hidden group hover:border-[#C9A63F]/50 transition-colors">
              <div className="relative z-10 w-2/3">
                <span className="text-[#C9A63F] text-[10px] font-bold uppercase tracking-wider block mb-1">
                  Mở bán giới hạn
                </span>
                <h4 className="text-xl font-black text-white mb-2">
                  IPHONE 15 PRO
                </h4>
                <p className="text-gray-400 text-xs mb-4">
                  Trả góp 0% - Duyệt hồ sơ 5 phút
                </p>
                <Link
                  href="/products"
                  className="text-xs font-bold text-white hover:text-[#C9A63F] flex items-center gap-1"
                >
                  Đăng ký ngay <ChevronRight size={14} />
                </Link>
              </div>
              <div className="absolute right-[-10%] bottom-[-10%] w-[50%] h-[120%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="/images/products/iphone-15.png"
                  alt="iPhone 15"
                  fill
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* THANH TIỆN ÍCH DƯỚI BANNER (Giống FPT/TGDD) */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 text-gray-400 justify-center">
            <ShieldCheck className="text-[#C9A63F]" size={24} />
            <div className="text-sm">
              <p className="text-white font-bold">100% Chính hãng</p>
              <p className="text-xs font-light">Bảo hành uy tín</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-400 justify-center border-l border-white/5">
            <Zap className="text-[#C9A63F]" size={24} />
            <div className="text-sm">
              <p className="text-white font-bold">Giao hàng 2H</p>
              <p className="text-xs font-light">Miễn phí nội thành</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-400 justify-center border-l border-white/5">
            <CreditCard className="text-[#C9A63F]" size={24} />
            <div className="text-sm">
              <p className="text-white font-bold">Trả góp 0%</p>
              <p className="text-xs font-light">Qua thẻ tín dụng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
