import type { Metadata } from "next";
import "./globals.css";
import AuthInitializer from "@/components/providers/AuthInitializer";

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
        {/* Giữ nguyên lớp bọc Firebase Auth */}
        <AuthInitializer>
          {children}{" "}
          {/* Trả lại không gian độc lập, không ép Header/Footer lên toàn hệ thống nữa */}
        </AuthInitializer>
      </body>
    </html>
  );
}
