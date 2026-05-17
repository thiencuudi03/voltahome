// src/app/(shop)/login/page.tsx
"use client";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      if (result?.user) {
        await setDoc(
          doc(db, "users", result.user.uid),
          {
            email: result.user.email,
            name: result.user.displayName || "",
          },
          { merge: true },
        );

        useAuthStore.setState({ user: result.user, isLoading: false });
        window.location.href = "/account";
      }
    } catch (err: any) {
      setErrorMsg("Xác thực Google bị hủy hoặc thất bại.");
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        useAuthStore.setState({ user: userCredential.user, isLoading: false });
        window.location.href = "/account";
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        if (name && userCredential.user) {
          await updateProfile(userCredential.user, { displayName: name });
        }

        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          name: name || "",
          wishlist: [],
          createdAt: new Date().toISOString(),
        });

        useAuthStore.setState({ user: userCredential.user, isLoading: false });
        window.location.href = "/account";
      }
    } catch (err: any) {
      setLoading(false);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setErrorMsg("Email hoặc mật khẩu không chính xác.");
      } else if (err.code === "auth/email-already-in-use") {
        setErrorMsg("Email này đã được sử dụng!");
      } else {
        setErrorMsg("Xác thực hệ thống thất bại. Vui lòng thử lại!");
      }
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#C9A63F] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.15em]">
          Đang xác thực hệ thống...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A63F]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="w-full max-w-lg bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-8 md:p-14 relative z-10 shadow-2xl">
        <div className="flex gap-8 border-b border-white/10 mb-10 pb-4">
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              setIsLogin(true);
              setErrorMsg("");
            }}
            className={`text-xl md:text-2xl font-black uppercase tracking-widest transition-all duration-300 ${isLogin ? "text-[#C9A63F] border-b-2 border-[#C9A63F] translate-y-[17px]" : "text-gray-600 hover:text-white"}`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              setIsLogin(false);
              setErrorMsg("");
            }}
            className={`text-xl md:text-2xl font-black uppercase tracking-widest transition-all duration-300 ${!isLogin ? "text-[#C9A63F] border-b-2 border-[#C9A63F] translate-y-[17px]" : "text-gray-600 hover:text-white"}`}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold p-4 rounded-2xl flex items-center gap-3">
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          {!isLogin && (
            <div className="space-y-2">
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
                  suppressHydrationWarning
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                suppressHydrationWarning
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
                suppressHydrationWarning
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-6 py-4 outline-none focus:border-[#C9A63F]/50 focus:bg-white/10 transition-all text-sm text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            suppressHydrationWarning
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
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleGoogleLogin}
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#C9A63F]/50 transition-all text-gray-300 hover:text-white"
            >
              <span className="font-bold text-xl">G</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
