export default function FeaturedProducts() {
  return (
    <section className="bg-black text-white py-20 px-10">
      <h2 className="text-3xl font-bold mb-10">Sản phẩm nổi bật</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-neutral-900 p-6 rounded-xl">Product 1</div>
        <div className="bg-neutral-900 p-6 rounded-xl">Product 2</div>
        <div className="bg-neutral-900 p-6 rounded-xl">Product 3</div>
      </div>
    </section>
  );
}
