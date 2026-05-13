import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner"; //

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
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        // Đã xóa overflow-x-hidden để Lenis Scroll hoạt động mượt
        className={`${inter.className} bg-[#050505] text-white min-h-screen flex flex-col w-full`}
      >
        <Header />

        {/* Chuyển overflow-x-hidden xuống main. Đổi mt-20 thành pt-20 */}
        <main className="flex-1 pt-20 flex flex-col w-full relative overflow-x-hidden">
          {children}
        </main>

        <Footer />

        {/* Cấu hình Toaster với phong cách Luxury phù hợp giao diện */}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "#0A0A0A",
              border: "1px solid rgba(201, 166, 63, 0.2)", // Viền vàng nhẹ
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
