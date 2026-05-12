"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, Clock, Crown, ArrowRight } from "lucide-react";

export default function OffersPage() {
  const offers = [
    {
      id: 1,
      title: "Đặc quyền chủ thẻ Black Card",
      desc: "Giảm trực tiếp 2.000.000đ cho các dòng MacBook Pro M3 Max khi thanh toán bằng thẻ tín dụng ưu tiên.",
      code: "VOLTBLACK",
      image:
        "https://images.unsplash.com/photo-1510511459019-5dee99c43dbf?q=80&w=2070",
      tag: "Limited",
    },
    {
      id: 2,
      title: "Hệ sinh thái thông minh",
      desc: "Tặng kèm gói lắp đặt SmartHome trị giá 5.000.000đ khi mua trọn bộ thiết bị giải trí tại gia.",
      code: "SMARTVOLT",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
      tag: "Eco-System",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A63F]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HERO SECTION */}
        <section className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C9A63F]/30 rounded-full mb-8">
            <Crown size={14} className="text-[#C9A63F]" />
            <span className="text-[#C9A63F] text-[10px] font-black uppercase tracking-[0.4em]">
              Exclusive Privileges
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 italic">
            ƯU ĐÃI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A63F] via-[#F5E6AD] to-[#C9A63F] not-italic">
              ĐẶC QUYỀN
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg font-light">
            Dành riêng cho những chủ nhân tìm kiếm sự hoàn mỹ. Những ưu đãi giới
            hạn mang đậm dấu ấn cá nhân từ VoltHome.
          </p>
        </section>

        {/* OFFERS LIST */}
        <section className="space-y-12">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-[3rem] overflow-hidden hover:border-[#C9A63F]/30 transition-all duration-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Ảnh ưu đãi */}
                <div className="relative h-[300px] lg:h-[450px] overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-8 left-8 bg-[#C9A63F] text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                    {offer.tag}
                  </div>
                </div>

                {/* Nội dung ưu đãi */}
                <div className="p-10 lg:p-16 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-3 text-[#C9A63F]">
                    <Clock size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                      Hết hạn sau 3 ngày
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight">
                    {offer.title}
                  </h2>
                  <p className="text-gray-400 font-light leading-relaxed text-lg">
                    {offer.desc}
                  </p>

                  {/* Voucher Box */}
                  <div className="bg-white/5 border border-dashed border-[#C9A63F]/40 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">
                        Mã ưu đãi
                      </p>
                      <p className="text-xl font-black text-[#C9A63F] tracking-widest">
                        {offer.code}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(offer.code);
                        alert("Đã sao chép mã đặc quyền!");
                      }}
                      className="bg-[#C9A63F] text-black px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
                    >
                      Sao chép
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* SERVICE SECTION */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
          <div className="space-y-4">
            <Crown className="text-[#C9A63F]" size={32} />
            <h4 className="text-lg font-bold uppercase">Hạng thẻ Diamond</h4>
            <p className="text-sm text-gray-500 font-light">
              Ưu tiên trải nghiệm các sản phẩm mới trước 07 ngày so với thị
              trường.
            </p>
          </div>
          <div className="space-y-4">
            <Ticket className="text-[#C9A63F]" size={32} />
            <h4 className="text-lg font-bold uppercase">Quà tặng sinh nhật</h4>
            <p className="text-sm text-gray-500 font-light">
              Voucher trị giá 2.000.000đ dành cho mọi khách hàng đã từng mua
              sắm.
            </p>
          </div>
          <div className="space-y-4">
            <ArrowRight className="text-[#C9A63F]" size={32} />
            <h4 className="text-lg font-bold uppercase">Trả góp 0%</h4>
            <p className="text-sm text-gray-500 font-light">
              Sở hữu kiệt tác công nghệ ngay hôm nay với lãi suất hoàn toàn bằng
              không.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
