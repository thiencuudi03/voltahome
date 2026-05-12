// PHẦN ĐĂNG KI & ĐĂNG NHAP

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Thêm thư viện điều hướng
import { Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  // Các state để lưu dữ liệu người dùng nhập
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Hàm xử lý logic khi nhấn nút Submit
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn trang bị load lại
    setErrorMsg(""); // Xóa thông báo lỗi cũ (nếu có)

    if (isLogin) {
      // ĐANG Ở TAB ĐĂNG NHẬP: Giả lập kiểm tra tài khoản
      if (email === "vip@gmail.com" && password === "123456") {
        router.push("/account"); // Đăng nhập thành công -> Vào account
      } else {
        // Đăng nhập thất bại
        setErrorMsg(
          "Tài khoản chưa tồn tại hoặc sai mật khẩu. Vui lòng đăng ký!",
        );
      }
    } else {
      // ĐANG Ở TAB ĐĂNG KÝ: Giả lập tạo tài khoản thành công
      alert("Tạo tài khoản VIP thành công! Vui lòng đăng nhập lại.");
      setIsLogin(true); // Chuyển ngược về tab Đăng nhập
      setPassword(""); // Xóa trắng mật khẩu
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A63F]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-8 md:p-14 relative z-10 shadow-2xl">
        <div className="flex gap-8 border-b border-white/10 mb-10 pb-4">
          <button
            onClick={() => {
              setIsLogin(true);
              setErrorMsg("");
            }}
            className={`text-xl md:text-2xl font-black uppercase tracking-widest transition-all duration-300 ${isLogin ? "text-[#C9A63F] border-b-2 border-[#C9A63F] translate-y-[17px]" : "text-gray-600 hover:text-white"}`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setErrorMsg("");
            }}
            className={`text-xl md:text-2xl font-black uppercase tracking-widest transition-all duration-300 ${!isLogin ? "text-[#C9A63F] border-b-2 border-[#C9A63F] translate-y-[17px]" : "text-gray-600 hover:text-white"}`}
          >
            Đăng ký
          </button>
        </div>

        {/* Form gọi hàm handleAuth khi nhấn Enter hoặc bấm nút */}
        <form onSubmit={handleAuth} className="space-y-6">
          {/* Vùng hiển thị thông báo lỗi */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          {!isLogin && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
                Họ và tên
              </label>
              <div className="relative group">
                <User
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#C9A63F] transition-colors"
                  size={20}
                />
                <input
                  required
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-6 py-4 outline-none focus:border-[#C9A63F]/50 focus:bg-white/10 transition-all text-sm text-white"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
              Email
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#C9A63F] transition-colors"
                size={20}
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vip@gmail.com"
                className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-6 py-4 outline-none focus:border-[#C9A63F]/50 focus:bg-white/10 transition-all text-sm text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-4">
              Mật khẩu
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#C9A63F] transition-colors"
                size={20}
              />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123456"
                className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-6 py-4 outline-none focus:border-[#C9A63F]/50 focus:bg-white/10 transition-all text-sm text-white"
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-[#C9A63F] transition-colors"
              >
                Quên mật khẩu?
              </button>
            </div>
          )}

          {/* Nút Submit đã đổi từ Link thành button type="submit" để kích hoạt hàm */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-[#C9A63F] text-black py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-500 mt-8 group"
          >
            {isLogin ? "Vào tài khoản" : "Tạo tài khoản VIP"}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-6">
            Hoặc tiếp tục với
          </p>
          <div className="flex gap-4 justify-center">
            <button className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#C9A63F]/50 transition-all text-gray-300 hover:text-white">
              <span className="font-bold text-xl">G</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
