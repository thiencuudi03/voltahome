export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      <img
        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      <div className="relative z-10 flex flex-col justify-center h-full px-10 text-white max-w-2xl">
        <h1 className="text-6xl font-bold leading-tight">
          Công Nghệ <br />
          <span className="text-yellow-500">Đỉnh Cao</span>
        </h1>

        <p className="mt-6 text-gray-300">
          Trải nghiệm thiết bị điện tử hiện đại với thiết kế tối giản
        </p>

        <button className="mt-8 w-fit bg-yellow-500 text-black px-6 py-3 rounded-full">
          Mua ngay →
        </button>
      </div>
    </section>
  );
}
