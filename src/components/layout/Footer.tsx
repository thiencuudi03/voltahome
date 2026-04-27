export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Logo + mô tả */}
        <div>
          <h2 className="text-white text-xl font-bold">
            Volt<span className="text-yellow-500">Home</span>
          </h2>
          <p className="mt-4 text-sm">
            Nơi cung cấp thiết bị điện tử cao cấp với thiết kế hiện đại và trải
            nghiệm tối ưu.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-white font-semibold mb-4">Menu</h3>
          <ul className="space-y-2">
            <li>Trang chủ</li>
            <li>Sản phẩm</li>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
          <ul className="space-y-2">
            <li>Chính sách bảo hành</li>
            <li>Đổi trả</li>
            <li>Thanh toán</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
          <p>Email: support@voltahome.com</p>
          <p className="mt-2">Hotline: 0123 456 789</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-6 text-sm">
        © 2026 VoltHome. All rights reserved.
      </div>
    </footer>
  );
}
