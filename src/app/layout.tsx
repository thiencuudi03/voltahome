// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import AuthInitializer from "@/components/providers/AuthInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoltHome — Tuyệt Tác Công Nghệ Tối Giản",
  description: "Nền tảng mua sắm thiết bị công nghệ cao cấp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white min-h-screen flex flex-col justify-between`}
      >
        <AuthInitializer>
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
          <Toaster richColors closeButton />
        </AuthInitializer>
      </body>
    </html>
  );
}
