"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfos = [
    {
      icon: <MapPin size={24} />,
      title: "Showroom",
      detail: "68 Nguyễn Chí Thanh, phường Tuy Hòa , tỉnh Đăk Lăk",
    },
    {
      icon: <Phone size={24} />,
      title: "Hotline VIP",
      detail: "1900 88 99 00 (24/7)",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      detail: "concierge@voltahome.com",
    },
    {
      icon: <Clock size={24} />,
      title: "Giờ làm việc",
      detail: "Thứ 2 - Chủ Nhật: 09:00 - 21:00",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 md:px-20 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C9A63F]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <section className="mb-20">
          <p className="text-[#C9A63F] text-xs uppercase tracking-[0.5em] font-bold mb-4">
            Kết nối với chúng tôi
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            LIÊN HỆ <span className="text-[#C9A63F]">TƯ VẤN</span>
          </h1>
          <p className="max-w-2xl text-gray-500 font-light text-lg">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn thiết kế
            không gian sống thông minh và đẳng cấp.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* CỘT TRÁI: Thông tin liên lạc */}
          <div className="lg:col-span-5 space-y-10">
            <div className="grid grid-cols-1 gap-8">
              {contactInfos.map((info, index) => (
                <div key={index} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#C9A63F] border border-white/5 group-hover:border-[#C9A63F]/50 transition-all duration-500">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">
                      {info.title}
                    </h4>
                    <p className="text-white text-lg font-light">
                      {info.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bản đồ hoặc hình ảnh minh họa */}
            <div className="aspect-video w-full rounded-[2rem] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 relative">
              <div className="absolute inset-0 bg-[#C9A63F]/10 mix-blend-overlay" />
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="VoltHome Office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CỘT PHẢI: Form liên hệ */}
          <div className="lg:col-span-7">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative">
              {submitted ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-[#C9A63F]/20 rounded-full flex items-center justify-center mx-auto">
                    <Send className="text-[#C9A63F]" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold uppercase">
                    Tin nhắn đã gửi thành công
                  </h3>
                  <p className="text-gray-500">
                    Cảm ơn bạn đã quan tâm. Chuyên viên của VoltHome sẽ liên hệ
                    lại trong vòng 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                        Họ và tên
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                        Email liên hệ
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="email@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                      Bạn quan tâm đến dòng sản phẩm nào?
                    </label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm appearance-none cursor-pointer">
                      <option className="bg-[#0A0A0A]">Điện thoại</option>
                      <option className="bg-[#0A0A0A]">Laptop</option>
                      <option className="bg-[#0A0A0A]">
                        Thiết bị SmartHome
                      </option>
                      <option className="bg-[#0A0A0A]">Phụ kiện</option>
                      <option className="bg-[#0A0A0A]">Khác</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                      Lời nhắn
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Chúng tôi có thể giúp gì cho không gian của bạn?"
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C9A63F] text-black py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-500 flex items-center justify-center gap-3"
                  >
                    Gửi yêu cầu tư vấn <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
