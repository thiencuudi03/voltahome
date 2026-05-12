"use client";

import Image from "next/image";
import Link from "next/link";
import { Cpu, Shield, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C9A63F]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 1. HERO SECTION */}
        <section className="text-center mb-40">
          <div className="inline-block px-4 py-1.5 border border-[#C9A63F]/30 rounded-full mb-8">
            <span className="text-[#C9A63F] text-[10px] font-black uppercase tracking-[0.4em]">
              Establishing a New Standard
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-10 italic">
            TECH MEETS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A63F] via-[#F5E6AD] to-[#C9A63F]">
              ELEGANCE.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-light leading-relaxed">
            Tại VoltHome, chúng tôi không chỉ bán thiết bị điện tử. Chúng tôi
            tuyển chọn những kiệt tác công nghệ để định nghĩa lại sự sang trọng
            trong ngôi nhà của bạn.
          </p>
        </section>

        {/* 2. THE VISION - FIX LỖI SIZES Ở ĐÂY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-48">
          <div className="lg:col-span-7 relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/5 group">
            <Image
              src="https://images.unsplash.com/photo-1510511459019-5dee99c43dbf?q=80&w=2070"
              alt="VoltHome Vision"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
              // DÒNG QUAN TRỌNG ĐỂ HẾT LỖI:
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
          </div>

          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl font-bold tracking-tight uppercase">
              Tầm nhìn <span className="text-[#C9A63F]">2026</span>
            </h2>
            <div className="h-1 w-20 bg-[#C9A63F]" />
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Xuất phát từ ý tưởng về một không gian sống nơi công nghệ và thẩm
              mỹ hòa làm một, VoltHome ra đời để phục vụ những khách hàng khắt
              khe nhất.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-3xl font-black text-white">5000+</h4>
                <p className="text-[#C9A63F] text-xs uppercase tracking-widest mt-2">
                  Khách hàng VIP
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white">100%</h4>
                <p className="text-[#C9A63F] text-xs uppercase tracking-widest mt-2">
                  Chính hãng
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE VALUES */}
        <section className="mb-48">
          <div className="text-center mb-20 text-3xl font-black uppercase tracking-widest italic">
            Giá trị cốt lõi
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu />,
                title: "Innovation",
                desc: "Dẫn đầu với những công nghệ đột phá nhất.",
              },
              {
                icon: <Shield />,
                title: "Trust",
                desc: "An tâm tuyệt đối với chế độ bảo hành đặc quyền.",
              },
              {
                icon: <Star />,
                title: "Curated",
                desc: "Mỗi sản phẩm là một tác phẩm được tuyển chọn.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-12 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 hover:border-[#C9A63F]/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="text-[#C9A63F] mb-8 scale-150 origin-left">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CALL TO ACTION */}
        <section className="relative rounded-[4rem] bg-gradient-to-b from-[#0A0A0A] to-[#050505] border border-white/5 p-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
            Sẵn sàng nâng cấp <br /> không gian của bạn?
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-10">
            <Link
              href="/products"
              className="px-10 py-4 bg-[#C9A63F] text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all duration-300"
            >
              Khám phá bộ sưu tập
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
