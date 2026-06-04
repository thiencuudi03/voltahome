import type { Metadata } from "next";
import "./globals.css";
import AuthInitializer from "@/components/providers/AuthInitializer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider"; // Import ThemeProvider

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
    // Thêm suppressHydrationWarning để tránh lỗi của next-themes
    <html lang="vi" suppressHydrationWarning>
      {/* Đã xóa bg-black text-white vì màu sắc giờ do biến CSS quản lý */}
      <body className="antialiased">
        {/* Bọc toàn bộ app bằng ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Đặt dark làm mặc định theo thiết kế Luxury
          enableSystem={false}
        >
          {/* AuthInitializer duy trì trạng thái đăng nhập */}
          <AuthInitializer>
            {/* Mẹo nhỏ: Bạn có thể đổi theme="dark" thành theme="system" 
              nếu muốn Toaster tự động đổi màu theo giao diện Sáng/Tối 
            */}
            <Toaster theme="system" position="top-right" />

            {children}
          </AuthInitializer>
        </ThemeProvider>
      </body>
    </html>
  );
}
