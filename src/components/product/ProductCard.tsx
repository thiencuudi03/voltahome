export default function ProductCard({ product }: any) {
  return (
    <div className="group bg-neutral-900 p-6 rounded-xl transition hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-40 bg-gray-800 mb-4"></div>

      <h3 className="text-lg font-semibold group-hover:text-yellow-500 transition">
        {product.name}
      </h3>

      <p className="text-gray-400">{product.price}</p>
    </div>
  );
}
