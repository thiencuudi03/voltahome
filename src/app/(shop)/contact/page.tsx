"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const result = await sendEmail(formData);

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
    setIsSubmitting(false);
  };

  const contactInfos = [
    {
      icon: <MapPin size={24} />,
      title: "Showroom",
      detail: "68 Nguyễn Chí Thanh, phường Tuy Hòa, tỉnh Đăk Lăk",
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
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C9A63F]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <section className="mb-20">
          <p className="text-[#C9A63F] text-xs uppercase tracking-[0.5em] font-bold mb-4">
            Kết nối với chúng tôi
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            LIÊN HỆ <span className="text-[#C9A63F]">TƯ VẤN</span>
          </h1>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-10">
            <div className="grid grid-cols-1 gap-8">
              {contactInfos.map((info, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#C9A63F] border border-white/5">
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
          </div>

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
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm"
                    />
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="Email"
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm"
                    />
                  </div>
                  <select
                    name="topic"
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option className="bg-[#0A0A0A]">Điện thoại</option>
                    <option className="bg-[#0A0A0A]">Laptop</option>
                    <option className="bg-[#0A0A0A]">Thiết bị SmartHome</option>
                  </select>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Lời nhắn"
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm resize-none"
                  ></textarea>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#C9A63F] text-black py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? "ĐANG GỬI..." : "GỬI YÊU CẦU TƯ VẤN"}{" "}
                    <Send size={16} />
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
