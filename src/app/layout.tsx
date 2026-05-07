import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoltHome | Thiết bị điện tử đỉnh cao",
  description: "Trải nghiệm mua sắm thiết bị điện tử hiện đại",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Header xuất hiện cố định ở mọi trang */}
        <Header />

        {/* Thêm pt-20 để đẩy nội dung xuống dưới Header (cao 80px) */}
        <main className="relative flex flex-col min-h-screen bg-[#050505]">
          {children}
        </main>
      </body>
    </html>
  );
}
