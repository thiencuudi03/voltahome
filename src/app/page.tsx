import HeroSection from "@/components/home/HeroSection";

import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoriesSection from "@/components/home/CategoriesSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
    </>
  );
}
