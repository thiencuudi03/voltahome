import Link from "next/link";
import { Laptop, Smartphone, Headphones, Tablet } from "lucide-react";

const categories = [
  { name: "Điện thoại", icon: Smartphone, href: "/products?category=phone" },
  { name: "Laptop", icon: Laptop, href: "/products?category=laptop" },
  { name: "Tablet", icon: Tablet, href: "/products?category=tablet" },
  { name: "Phụ kiện", icon: Headphones, href: "/products?category=accessories" },
];

export default function CategoriesSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-4xl font-bold">Danh mục nổi bật</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="rounded-2xl bg-white p-8 text-center shadow transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Icon className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}