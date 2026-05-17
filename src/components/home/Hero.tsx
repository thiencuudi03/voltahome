// src/components/home/Hero.tsx
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

// Dữ liệu cho Banner lớn trải dài ở trên
const topBanners = [
  { id: 1, image: "/images/products/bn-m1.png", link: "/offers" },
  { id: 2, image: "/images/products/bn-m2.png", link: "/offers" },
];

// Dữ liệu cho cụm 3 hình bên dưới
const gridSlides = [
  {
    id: 1,
    title: "ĐẶC QUYỀN MACBOOK",
    subtitle: "GIẢM THẲNG 5 TRIỆU",
    image: "/images/products/macbook-m3.png",
    link: "/products",
  },
  {
    id: 2,
    title: "SAMSUNG GALAXY S24",
    subtitle: "THU CŨ ĐỔI MỚI",
    image: "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
    link: "/products",
  },
];

export default function Hero() {
  const [currentTop, setCurrentTop] = useState(0);
  const [currentGrid, setCurrentGrid] = useState(0);

  useEffect(() => {
    const topTimer = setInterval(() => {
      setCurrentTop((prev) => (prev === topBanners.length - 1 ? 0 : prev + 1));
    }, 6000);
    const gridTimer = setInterval(() => {
      setCurrentGrid((prev) => (prev === gridSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      clearInterval(topTimer);
      clearInterval(gridTimer);
    };
  }, []);

  return (
    <section className="pt-24 pb-12 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* --- BANNER LỚN TRÊN CÙNG: ÉP TỈ LỆ DẸT CỰC ĐẠI --- */}
          <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[2.2/1] sm:aspect-[3/1] md:aspect-[4/1] lg:aspect-[6/1] group shadow-2xl border border-white/5 bg-[#111]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Link
                  href={topBanners[currentTop].link}
                  className="relative block w-full h-full"
                >
                  <Image
                    src={topBanners[currentTop].image}
                    alt="VoltHome Main Promo"
                    fill
                    priority
                    className="object-cover"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Bổ sung suppressHydrationWarning chống Edge tự điền thuộc tính lạ */}
            <button
              onClick={() =>
                setCurrentTop((prev) =>
                  prev === 0 ? topBanners.length - 1 : prev - 1,
                )
              }
              suppressHydrationWarning
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Bổ sung suppressHydrationWarning chống Edge tự điền thuộc tính lạ */}
            <button
              onClick={() =>
                setCurrentTop((prev) =>
                  prev === topBanners.length - 1 ? 0 : prev + 1,
                )
              }
              suppressHydrationWarning
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* --- CỤM 3 BỐ CỤC ĐÓNG KHUNG (1 TO - 2 NHỎ) --- */}
          <div className="relative w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden p-4 md:p-8 bg-[#0f0f0f] border border-white/10 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A63F]/5 via-transparent to-transparent opacity-40 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
              {/* Slider 1 To */}
              <div className="lg:col-span-8 relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-black border border-white/5 aspect-[16/9] md:aspect-[2/1] group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGrid}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-1/2 p-6 md:p-12 z-20">
                      <h2 className="text-xl md:text-3xl font-black text-white uppercase italic leading-none mb-3">
                        {gridSlides[currentGrid].title}
                      </h2>
                      <p className="text-[#C9A63F] font-bold text-sm md:text-xl mb-6">
                        {gridSlides[currentGrid].subtitle}
                      </p>
                      <Link
                        href={gridSlides[currentGrid].link}
                        className="inline-block px-8 py-3 bg-[#C9A63F] text-black font-black text-[10px] md:text-xs rounded-xl uppercase hover:bg-white transition-all"
                      >
                        Mua ngay
                      </Link>
                    </div>
                    <div className="w-1/2 h-full relative z-10 flex items-center justify-center">
                      <Image
                        src={gridSlides[currentGrid].image}
                        alt="Product"
                        fill
                        priority
                        className="object-contain p-4 md:p-6 scale-110"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 2 Banner nhỏ bên phải */}
              <div className="lg:col-span-4 flex flex-col gap-4 md:gap-5">
                <div className="flex-1 rounded-2xl md:rounded-[1.5rem] bg-black border border-white/5 relative overflow-hidden group min-h-[150px] md:min-h-[180px]">
                  <Image
                    src="/images/products/sony-wh1000xm5.png"
                    alt="Sony"
                    fill
                    className="object-contain p-4 md:p-6 group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-4 md:p-6 flex flex-col justify-end">
                    <p className="text-white font-black text-sm md:text-lg">
                      SONY WH-1000XM5
                    </p>
                    <p className="text-[#C9A63F] text-[10px] font-bold uppercase tracking-widest">
                      Flash Sale 20%
                    </p>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl md:rounded-[1.5rem] bg-black border border-white/5 relative overflow-hidden group min-h-[150px] md:min-h-[180px]">
                  <Image
                    src="/images/products/iphone-15.png"
                    alt="iPhone"
                    fill
                    className="object-contain p-4 md:p-6 group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-4 md:p-6 flex flex-col justify-end">
                    <p className="text-white font-black text-sm md:text-lg">
                      IPHONE 15 PRO
                    </p>
                    <p className="text-[#C9A63F] text-[10px] font-bold uppercase tracking-widest">
                      Trả góp 0%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TIỆN ÍCH DƯỚI CÙNG */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-12 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left justify-center">
            <ShieldCheck className="text-[#C9A63F]" size={32} />
            <div>
              <p className="text-white font-bold text-xs md:text-base">
                100% Chính hãng
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs hidden sm:block">
                An tâm mua sắm
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left justify-center border-x border-white/5">
            <Zap className="text-[#C9A63F]" size={32} />
            <div>
              <p className="text-white font-bold text-xs md:text-base">
                Giao hàng 2H
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs hidden sm:block">
                Miễn phí nội thành
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left justify-center">
            <CreditCard className="text-[#C9A63F]" size={32} />
            <div>
              <p className="text-white font-bold text-xs md:text-base">
                Trả góp 0%
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs hidden sm:block">
                Duyệt nhanh 5 phút
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
