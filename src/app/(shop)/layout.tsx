import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header chỉ xuất hiện ở các trang bán hàng thuộc nhóm (shop) */}
      <Header />

      {/* Nội dung chi tiết của từng trang như trang chủ, chi tiết sản phẩm, giỏ hàng */}
      <main className="flex-grow">{children}</main>

      {/* Footer chỉ xuất hiện ở các trang bán hàng thuộc nhóm (shop) */}
      <Footer />
    </div>
  );
}
