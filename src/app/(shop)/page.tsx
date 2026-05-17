// Trang chủ
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection"; // Thêm dòng này
import AboutSection from "@/components/home/AboutSection";
import FeatureProducts from "@/components/home/FeatureProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <AboutSection />
      <FeatureProducts />
    </>
  );
}
