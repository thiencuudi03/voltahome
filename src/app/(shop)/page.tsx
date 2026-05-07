import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* About Section - Đã có padding bên trong file AboutSection.tsx */}
      <AboutSection />

      {/* Product Section - Thêm py-32 để tạo khoảng cách cực rộng */}
      <section className="py-32 px-6 md:px-20 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tight">
              Sản phẩm <br className="md:hidden" />
              <span className="text-[#C9A63F]">Tiêu biểu</span>
            </h2>
            <button
              suppressHydrationWarning={true}
              className="text-gray-500 text-[10px] uppercase tracking-[0.3em] hover:text-[#C9A63F] transition-colors border-b border-gray-800 pb-1"
            >
              Xem tất cả
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-white/[0.02] rounded-[2rem] border border-white/5 flex items-center justify-center text-gray-700 italic text-sm"
              >
                Product Preview {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Đảm bảo có khoảng cách phía trên */}
      <Footer />
    </main>
  );
}
