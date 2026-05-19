import type { Metadata } from "next";
import "./globals.css";
import AuthInitializer from "@/components/providers/AuthInitializer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "VoltHome - Luxury Electronics",
  description: "Luxury Electronics E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased bg-black text-white">
        {/* AuthInitializer sẽ duy trì trạng thái đăng nhập cho toàn bộ trang web */}
        <AuthInitializer>
          {/* Toaster đặt ở đây để thông báo hiển thị trên toàn hệ thống (cả Shop và Admin) */}
          <Toaster theme="dark" position="top-right" />
          {children}
        </AuthInitializer>
      </body>
    </html>
  );
}
