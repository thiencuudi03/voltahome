import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import AuthInitializer from "@/components/providers/AuthInitializer";

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
        className={`${inter.className} bg-[#050505] text-white min-h-screen flex flex-col w-full`}
      >
        <AuthInitializer>
          <Header />
          <main className="flex-1 pt-20 flex flex-col w-full relative overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </AuthInitializer>

        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "#0A0A0A",
              border: "1px solid rgba(201, 166, 63, 0.2)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
