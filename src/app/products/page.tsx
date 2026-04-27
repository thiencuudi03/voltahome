import ProductCard from "@/components/product/ProductCard";

const products = [
  { id: "1", name: "iPhone 15", price: 20000000 },
  { id: "2", name: "Laptop Dell", price: 15000000 },
];

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sản phẩm</h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
