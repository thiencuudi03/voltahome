import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      {/* 1. Phần Hero (Tiêu đề & Nút Mua ngay) */}
      <Hero />

      {/* 2. Phần Giới thiệu (Kiến tạo không gian số) */}
      <AboutSection />

      {/* 3. Khu vực Sản phẩm tiêu biểu (Bạn có thể thêm sau) */}
      <section className="py-20 px-6 md:px-20 bg-[#050505]">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-white text-3xl font-black uppercase tracking-tight">
              Sản phẩm <span className="text-[#C9A63F]">Tiêu biểu</span>
            </h2>
            <button className="text-gray-500 text-xs uppercase tracking-widest hover:text-white transition-colors">
              Xem tất cả
            </button>
          </div>

          {/* Placeholder cho danh sách sản phẩm */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center text-gray-700 italic text-sm"
              >
                Product Preview {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Chân trang (Footer tối giản) */}
      <Footer />
    </main>
  );
}
