import type { Metadata } from "next";
import "./globals.css";
import AuthInitializer from "@/components/providers/AuthInitializer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "VoltHome - Luxury Electronics",
  description: "Luxury Electronics E-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/* Thay đổi className của body thành bg-background và text-foreground */}
      <body className="bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthInitializer>
            <Toaster theme="system" position="top-right" />
            {children}
          </AuthInitializer>
        </ThemeProvider>
      </body>
    </html>
  );
}
