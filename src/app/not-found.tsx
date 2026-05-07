// src/app/not-found.tsx
// Xử lý trang 404 cho dự án VoltHome

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 overflow-hidden">
      <div className="relative flex flex-col items-center">
        <h1 className="text-9xl font-extrabold text-yellow-500 tracking-widest animate-pulse">
          404
        </h1>
        <div className="bg-white px-2 text-sm rounded rotate-12 absolute top-1/2 -translate-y-1/2 text-black font-bold uppercase shadow-xl">
          Page Not Found
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-medium mb-2 uppercase tracking-widest text-gray-200">
          Không tìm thấy trang
        </h2>
        <p className="text-gray-400 text-center max-w-md leading-relaxed">
          Rất tiếc, thiết bị hoặc trang bạn đang tìm kiếm không tồn tại trong hệ
          thống VoltHome. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang
          chủ.
        </p>
      </div>

      <Link
        href="/"
        className="mt-10 px-10 py-3 border border-yellow-500 text-yellow-500 font-bold rounded-full 
        hover:bg-yellow-500 hover:text-black transition-all duration-300 uppercase text-xs tracking-widest active:scale-95"
      >
        Quay lại Trang Chủ
      </Link>
    </div>
  );
}
