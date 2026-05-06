//Root layout

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoltHome | Thiết bị điện tử đỉnh cao",
  description: "Trải nghiệm mua sắm thiết bị điện tử hiện đại",
};

// BẮT BUỘC phải có "export default" ở đây
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Header sẽ xuất hiện ở mọi trang */}
        <Header />

        {/* Children là nội dung của các trang như page.tsx */}
        <main>{children}</main>
      </body>
    </html>
  );
}
