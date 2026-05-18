"use client";

import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    lowStock: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hàm gọi API thông minh chặn đứng lỗi "Unexpected token '<'" và tự sửa bẫy Windows
    const safeFetch = async (url: string) => {
      try {
        let res = await fetch(url);

        // BẪY 1: Nếu dính lỗi 404 (do kẹt cache chữ hoa/thường trên Windows), tự động thử đường dẫn ngược lại
        if (res.status === 404) {
          const fallbackUrl = url.includes("/api/")
            ? url.replace("/api/", "/API/")
            : url.replace("/API/", "/api/");
          res = await fetch(fallbackUrl);
        }

        // BẪY 2: Nếu Server bị lỗi ngầm (Status 500 hoặc không OK), dừng lại dùng mảng rỗng, không ép parse JSON
        if (!res.ok) {
          console.error(`Cổng ${url} trả về mã lỗi HTTP: ${res.status}`);
          return { success: false, data: [] };
        }

        // BẪY 3: Kiểm tra xem Server trả về JSON hay HTML. Nếu trả về trang lỗi HTML, không parse để tránh crash dấu <
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error(
            `Cổng ${url} trả về giao diện HTML thay vì dữ liệu JSON.`,
          );
          return { success: false, data: [] };
        }

        return await res.json();
      } catch (err) {
        console.error(`Lỗi kết nối đường truyền tới cổng ${url}:`, err);
        return { success: false, data: [] };
      }
    };

    const fetchDashboardData = async () => {
      try {
        // Kích hoạt nạp dữ liệu an toàn đồng thời từ 2 cổng API
        const [dataProducts, dataOrders] = await Promise.all([
          safeFetch("/api/products"),
          safeFetch("/api/orders"),
        ]);

        const actualProducts = dataProducts.success ? dataProducts.data : [];
        const actualOrders = dataOrders.success ? dataOrders.data : [];

        // 1. Tính toán số liệu tổng quan từ Database thực tế
        const totalRevenue = actualOrders.reduce(
          (sum: number, order: any) => sum + (order.totalAmount || 0),
          0,
        );
        const lowStockCount = actualProducts.filter(
          (p: any) => (p.stock || 0) < 5,
        ).length;

        setStats({
          revenue: totalRevenue,
          orders: actualOrders.length,
          products: actualProducts.length,
          lowStock: lowStockCount,
        });

        // 2. Lấy ra 5 đơn hàng vừa đặt mới nhất để hiển thị lên bảng
        const sortedOrders = actualOrders
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5);

        setRecentOrders(sortedOrders);
      } catch (error) {
        console.error("Lỗi xử lý logic tính toán dữ liệu Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-amber-500 flex items-center justify-center font-mono text-lg tracking-wider">
        <span className="animate-pulse">
          ⏳ Đang đồng bộ hóa dữ liệu từ Server Cloud Firebase...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-widest text-amber-500">
              VOLTHOME
            </h1>
            <p className="text-xs text-zinc-500 tracking-wider mt-1">
              MANAGEMENT CONSOLE
            </p>
          </div>
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 bg-amber-500/10 text-amber-500 rounded-lg font-medium"
            >
              <span>📊</span>
              <span>Tổng quan Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 rounded-lg transition-all"
            >
              <span>📦</span>
              <span>Quản lý sản phẩm</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 rounded-lg transition-all"
            >
              <span>📜</span>
              <span>Quản lý đơn hàng</span>
            </a>
          </nav>
        </div>
        <div className="pt-6 border-t border-zinc-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-zinc-950">
            AH
          </div>
          <div>
            <p className="text-sm font-semibold">Admin Hue</p>
            <p className="text-xs text-zinc-500">Cấp quyền tối cao</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Hệ thống tổng quan
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Dữ liệu kết nối động an toàn thông qua API Route Handler ẩn cấu
              hình Firebase SDK.
            </p>
          </div>
        </header>

        {/* STATS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <div className="flex justify-between items-center text-zinc-400 mb-3">
              <span className="text-sm font-medium tracking-wider">
                TỔNG DOANH THU THỰC
              </span>
              <span>💰</span>
            </div>
            <p className="text-2xl font-bold tracking-tight text-amber-400">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(stats.revenue)}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <div className="flex justify-between items-center text-zinc-400 mb-3">
              <span className="text-sm font-medium tracking-wider">
                TỔNG ĐƠN HÀNG
              </span>
              <span>🛒</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">
              {stats.orders} đơn
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <div className="flex justify-between items-center text-zinc-400 mb-3">
              <span className="text-sm font-medium tracking-wider">
                MẶT HÀNG TRÊN KHO
              </span>
              <span>📦</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">
              {stats.products} sản phẩm
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <div className="flex justify-between items-center text-zinc-400 mb-3">
              <span className="text-sm font-medium tracking-wider">
                CẢNH BÁO HẾT HÀNG
              </span>
              <span>⚠️</span>
            </div>
            <p className="text-2xl font-bold tracking-tight text-rose-500">
              {stats.lowStock} mặt hàng
            </p>
          </div>
        </section>

        {/* RECENT ORDERS TABLE */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-bold tracking-tight mb-6">
            Đơn hàng mới nhận thực tế
          </h3>

          {recentOrders.length === 0 ? (
            <p className="text-zinc-500 text-sm font-mono p-4 bg-zinc-950 rounded-lg border border-zinc-800/50">
              📭 Hiện tại chưa ghi nhận đơn hàng mua sắm nào phát sinh trên cơ
              sở dữ liệu.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-medium tracking-wider uppercase">
                    <th className="pb-4">Mã đơn</th>
                    <th className="pb-4">Khách hàng</th>
                    <th className="pb-4">Số điện thoại</th>
                    <th className="pb-4">Tổng tiền</th>
                    <th className="pb-4">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-sm">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-zinc-800/20 transition-all"
                    >
                      <td className="py-4 font-mono text-amber-500 text-xs">
                        {order.id}
                      </td>
                      <td className="py-4 font-medium">
                        {order.customerInfo?.name || "Ẩn danh"}
                      </td>
                      <td className="py-4 text-zinc-400">
                        {order.customerInfo?.phone || "Không có"}
                      </td>
                      <td className="py-4 font-semibold text-zinc-200">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.totalAmount)}
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {order.status || "Chờ xác nhận"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
