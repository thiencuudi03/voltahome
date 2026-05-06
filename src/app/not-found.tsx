// Xử lý trang 404

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <h1 className="text-9xl font-extrabold text-yellow-500 tracking-widest">
        404
      </h1>
      <div className="bg-white px-2 text-sm rounded rotate-12 absolute text-black font-bold">
        Page Not Found
      </div>
      <p className="text-gray-400 mt-8 text-center max-w-md">
        Rất tiếc, thiết bị hoặc trang bạn đang tìm kiếm không tồn tại trong hệ
        thống VoltHome.
      </p>
      <Link
        href="/"
        className="mt-10 px-8 py-3 border border-yellow-500 text-yellow-500 font-bold rounded-full hover:bg-yellow-500 hover:text-black transition-all"
      >
        Quay lại Trang Chủ
      </Link>
    </div>
  );
}
