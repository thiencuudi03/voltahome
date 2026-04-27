import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/lib/_smoothScroll"; // 1. Import cái này vào

export const metadata: Metadata = {
  title: "Volt Home",
  description: "Website bán thiết bị điện tử",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-black antialiased">
        {" "}
        {/* Thêm bg-black để đồng bộ phong cách tối */}
        <SmoothScroll /> {/* 2. Gọi nó ở đây để kích hoạt cuộn mượt */}
        <Header />
        {/* 3. Thêm min-h-screen để main luôn chiếm hết màn hình, đẩy Footer xuống dưới */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
