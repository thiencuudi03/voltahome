// Trang tài khoản

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Settings,
  LogOut,
  MapPin,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function AccountPage() {
  // Trạng thái để chuyển đổi giữa các tab
  const [activeTab, setActiveTab] = useState("profile");

  // Dữ liệu đơn hàng giả lập
  const mockOrders = [
    {
      id: "VLT-2026-089",
      date: "15/05/2026",
      total: "45.990.000đ",
      status: "Đang giao",
      item: "MacBook Pro M3",
    },
    {
      id: "VLT-2026-042",
      date: "02/04/2026",
      total: "29.990.000đ",
      status: "Hoàn thành",
      item: "iPhone 15 Pro Max",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-20 relative overflow-hidden">
      {/* Hiệu ứng ánh sáng nền */}
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#C9A63F]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header của trang tài khoản */}
        <div className="mb-16 border-b border-white/10 pb-8 flex items-end justify-between">
          <div>
            <p className="text-[#C9A63F] text-xs uppercase tracking-[0.4em] font-bold mb-2">
              Đặc quyền thành viên
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Tài khoản <span className="text-gray-500 font-light">VIP</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
            <ShieldCheck size={18} className="text-[#C9A63F]" />
            <span className="text-sm font-bold tracking-widest uppercase">
              Hạng: Gold Member
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* CỘT TRÁI: Menu điều hướng */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${activeTab === "profile" ? "bg-[#C9A63F] text-black" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
            >
              <div className="flex items-center gap-4">
                <User size={20} />
                <span className="font-bold text-sm uppercase tracking-widest">
                  Hồ sơ cá nhân
                </span>
              </div>
              {activeTab === "profile" && <ChevronRight size={18} />}
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${activeTab === "orders" ? "bg-[#C9A63F] text-black" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
            >
              <div className="flex items-center gap-4">
                <Package size={20} />
                <span className="font-bold text-sm uppercase tracking-widest">
                  Đơn hàng của tôi
                </span>
              </div>
              {activeTab === "orders" && <ChevronRight size={18} />}
            </button>

            <button className="w-full flex items-center gap-4 p-5 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300">
              <Settings size={20} />
              <span className="font-bold text-sm uppercase tracking-widest">
                Cài đặt
              </span>
            </button>

            <div className="pt-8 mt-8 border-t border-white/10">
              {/* ĐÃ SỬA: Điều hướng về /login thay vì / */}
              <Link
                href="/login"
                className="w-full flex items-center gap-4 p-5 rounded-2xl hover:bg-red-500/10 text-red-500 transition-all duration-300"
              >
                <LogOut size={20} />
                <span className="font-bold text-sm uppercase tracking-widest">
                  Đăng xuất
                </span>
              </Link>
            </div>
          </div>

          {/* CỘT PHẢI: Nội dung chi tiết */}
          <div className="lg:col-span-9">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl min-h-[500px]">
              {/* NỘI DUNG TAB: HỒ SƠ */}
              {activeTab === "profile" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-2xl font-bold uppercase tracking-widest mb-10 border-l-4 border-[#C9A63F] pl-4">
                    Thông tin liên hệ
                  </h2>
                  <form className="space-y-8 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          defaultValue="Khách hàng VIP"
                          className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          defaultValue="0988 *** ***"
                          className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#C9A63F]/50 transition-all text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="vip.member@example.com"
                        disabled
                        className="w-full bg-transparent border border-white/10 rounded-full px-6 py-4 outline-none text-sm text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                        Địa chỉ giao hàng mặc định
                      </label>
                      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[2rem] p-4">
                        <div className="w-12 h-12 bg-[#050505] rounded-full flex items-center justify-center text-[#C9A63F]">
                          <MapPin size={20} />
                        </div>
                        <p className="text-sm text-gray-300 font-light flex-1">
                          Tòa nhà TMA, Công viên Phần mềm Quang Trung, Quận 12,
                          TP.HCM
                        </p>
                        <button
                          type="button"
                          className="text-xs uppercase tracking-widest text-[#C9A63F] font-bold hover:text-white px-4"
                        >
                          Thay đổi
                        </button>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        className="bg-[#C9A63F] text-black px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300"
                      >
                        Cập nhật hồ sơ
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* NỘI DUNG TAB: ĐƠN HÀNG */}
              {activeTab === "orders" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-2xl font-bold uppercase tracking-widest mb-10 border-l-4 border-[#C9A63F] pl-4">
                    Lịch sử mua sắm
                  </h2>
                  <div className="space-y-6">
                    {mockOrders.map((order, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C9A63F]/30 transition-all duration-300"
                      >
                        <div className="space-y-2">
                          <p className="text-[#C9A63F] text-xs font-bold uppercase tracking-widest">
                            {order.id}
                          </p>
                          <h4 className="text-lg font-bold">{order.item}</h4>
                          <p className="text-sm text-gray-500">
                            Ngày đặt: {order.date}
                          </p>
                        </div>
                        <div className="text-left md:text-right space-y-2">
                          <p className="text-xl font-serif italic text-white">
                            {order.total}
                          </p>
                          <div
                            className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${order.status === "Hoàn thành" ? "bg-green-500/10 text-green-400" : "bg-[#C9A63F]/10 text-[#C9A63F]"}`}
                          >
                            {order.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 text-center">
                    <Link
                      href="/products"
                      className="inline-block border-b border-[#C9A63F] pb-1 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-[#C9A63F] transition-colors"
                    >
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
