"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getFirebaseProducts,
  getFirebaseOrders,
  updateFirebaseProduct,
  deleteFirebaseProduct,
  updateFirebaseOrderStatus,
  getFirebaseCategories,
  addFirebaseCategory,
  updateFirebaseCategory,
  deleteFirebaseCategory,
} from "@/services/productService";
import ProductForm from "@/components/admin/ProductForm";
import { useAuthStore } from "@/store/authStore";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

type AdminTab =
  | "overview"
  | "analytics"
  | "products"
  | "categories"
  | "invoices"
  | "customers";
type ProductSubTab = "product_crud" | "warehouse_stock";

export default function AdminDashboard() {
  const router = useRouter();

  // 🌟 LÕI BẢO MẬT & PHÂN QUYỀN
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  const [currentTab, setCurrentTab] = useState<AdminTab>("overview");
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [productSubTab, setProductSubTab] =
    useState<ProductSubTab>("warehouse_stock");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCatForm, setShowCatForm] = useState(false);
  const [invoiceFilter, setInvoiceFilter] = useState("Tất cả");

  // Inline Editing cho Sản phẩm
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  // Inline Editing cho Danh mục
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editCatFormData, setEditCatFormData] = useState({
    name: "",
    slug: "",
    icon: "",
  });

  // Form Thêm Danh mục mới
  const [newCatData, setNewCatData] = useState({
    name: "",
    slug: "",
    icon: "📁",
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ==========================================
  // XỬ LÝ PHÂN QUYỀN ADMIN TỐI CAO
  // ==========================================
  useEffect(() => {
    if (!isAuthLoading) {
      if (!user) {
        router.push("/login");
      } else {
        const adminEmail = "thiencuudi@gmail.com";

        if (user.email?.toLowerCase() === adminEmail.toLowerCase()) {
          setIsAdminVerified(true);
        } else {
          toast.error("TRUY CẬP BỊ TỪ CHỐI", {
            description: "Tài khoản không có đặc quyền quản trị.",
          });
          router.push("/");
        }
      }
    }
  }, [user, isAuthLoading, router]);

  const loadDataFromServer = async () => {
    try {
      setLoading(true);
      const [actualProducts, actualOrders, actualCats] = await Promise.all([
        getFirebaseProducts(),
        getFirebaseOrders(),
        getFirebaseCategories(),
      ]);
      setProducts(actualProducts);
      setOrders(actualOrders);
      setCategories(actualCats);
    } catch (error) {
      console.error("Lỗi đồng bộ hệ thống Admin:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chỉ nạp dữ liệu khi đã xác thực Admin thành công
  useEffect(() => {
    if (isAdminVerified) {
      loadDataFromServer();
    }
  }, [isAdminVerified, currentTab, productSubTab]);

  // Hàm xử lý chỉ mở modal, chưa thoát ngay
  const handleAdminLogout = () => {
    setShowLogoutModal(true);
  };

  // Hàm thoát thật sự (sau khi nhấn OK trong modal)
  const confirmLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // ==========================================
  // XỬ LÝ SỬA & XÓA SẢN PHẨM
  // ==========================================
  const handleStartEdit = (p: any) => {
    setEditingId(p.id);
    setEditFormData({
      name: p.name,
      price: p.price.toString(),
      stock: p.stock.toString(),
      category: p.category,
      image: p.image,
    });
  };

  const handleSaveEdit = async (id: string) => {
    setLoading(true);
    const res = await updateFirebaseProduct(id, editFormData);
    if (res.success) {
      setEditingId(null);
      await loadDataFromServer();
      toast.success("Đã cập nhật sản phẩm thành công!");
    } else {
      toast.error("Cập nhật sản phẩm thất bại.");
      setLoading(false);
    }
  };

  const handleDeleteProductReal = async (id: string, name: string) => {
    if (confirm(`⚠️ Bạn có chắc chắn muốn XÓA VĨNH VIỄN sản phẩm "${name}"?`)) {
      setLoading(true);
      const res = await deleteFirebaseProduct(id);
      if (res.success) {
        await loadDataFromServer();
        toast.success("Đã xóa sản phẩm thành công!");
      } else {
        toast.error("Xóa sản phẩm thất bại.");
        setLoading(false);
      }
    }
  };

  // ==========================================
  // XỬ LÝ CRUD DANH MỤC THẬT 100% FIREBASE
  // ==========================================
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatData.name || !newCatData.slug)
      return toast.warning("Vui lòng điền đủ Tên và Mã Slug!");
    setLoading(true);
    const res = await addFirebaseCategory(newCatData);
    if (res.success) {
      setNewCatData({ name: "", slug: "", icon: "📁" });
      setShowCatForm(false);
      await loadDataFromServer();
      toast.success("Đã khởi tạo ngành hàng danh mục mới!");
    } else {
      toast.error("Thêm danh mục mới thất bại.");
      setLoading(false);
    }
  };

  const handleStartEditCat = (cat: any) => {
    setEditingCatId(cat.id);
    setEditCatFormData({ name: cat.name, slug: cat.slug, icon: cat.icon });
  };

  const handleSaveEditCat = async (id: string) => {
    setLoading(true);
    const res = await updateFirebaseCategory(id, editCatFormData);
    if (res.success) {
      setEditingCatId(null);
      await loadDataFromServer();
      toast.success("Đã lưu thay đổi cấu trúc danh mục!");
    } else {
      toast.error("Cập nhật danh mục thất bại.");
      setLoading(false);
    }
  };

  const handleDeleteCategoryReal = async (id: string, name: string) => {
    if (
      confirm(
        `⚠️ Bạn có chắc chắn muốn XÓA DANH MỤC "${name}"? Việc này có thể làm ẩn các sản phẩm thuộc danh mục này ngoài cửa hàng.`,
      )
    ) {
      setLoading(true);
      const res = await deleteFirebaseCategory(id);
      if (res.success) {
        await loadDataFromServer();
        toast.success("Đã gỡ bỏ danh mục khỏi hệ thống!");
      } else {
        toast.error("Gỡ bỏ danh mục thất bại.");
        setLoading(false);
      }
    }
  };

  // Logic duyệt trạng thái hóa đơn
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setLoading(true);
    const res = await updateFirebaseOrderStatus(orderId, newStatus);
    if (res.success) {
      await loadDataFromServer();
      toast.success(`Đã chuyển trạng thái sang [${newStatus}]!`);
    } else {
      toast.error("Cập nhật thất bại.");
      setLoading(false);
    }
  };

  // ==========================================
  // TÍNH TOÁN DỮ LIỆU ĐỘNG & THỐNG KÊ
  // ==========================================
  const totalRevenue = orders
    .filter(
      (order) =>
        order.status === "Đã thanh toán" || order.status === "Đang giao hàng",
    )
    .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const lowStockProducts = products.filter((p) => (p.stock || 0) < 5);
  const totalItemsInWarehouse = products.reduce(
    (sum, p) => sum + (p.stock || 0),
    0,
  );
  const totalWarehouseValue = products.reduce(
    (sum, p) => sum + (p.stock || 0) * (p.price || 0),
    0,
  );

  const dynamicCategoryStats = categories.map((cat) => {
    const count = products.filter((p) => p.category === cat.slug).length;
    return { ...cat, count };
  });

  const customerMap: { [key: string]: any } = {};
  orders.forEach((order) => {
    const phone = order.customerInfo?.phone || "Không rõ";
    if (!customerMap[phone]) {
      customerMap[phone] = {
        name: order.customerInfo?.name || "Khách lẻ",
        phone,
        totalSpent: 0,
        totalOrders: 0,
      };
    }
    customerMap[phone].totalSpent += order.totalAmount || 0;
    customerMap[phone].totalOrders += 1;
  });

  // LOGIC DỮ LIỆU ĐỂ XUẤT BÁO CÁO & BIỂU ĐỒ
  const statusCounts = { confirmed: 0, pending: 0, cancelled: 0 };
  orders.forEach((o) => {
    const status = o.status || "Chờ xác nhận";
    if (status === "Đã thanh toán" || status === "Đang giao hàng")
      statusCounts.confirmed++;
    else if (status === "Đã hủy") statusCounts.cancelled++;
    else statusCounts.pending++;
  });

  const revenueByCategory: { [key: string]: number } = {};
  categories.forEach((cat) => {
    revenueByCategory[cat.slug] = 0;
  });
  orders.forEach((order) => {
    if (order.status === "Đã thanh toán" || order.status === "Đang giao hàng") {
      const category = order.category || "iphone"; // Fallback
      if (revenueByCategory[category] !== undefined) {
        revenueByCategory[category] += order.totalAmount || 0;
      } else {
        revenueByCategory["Khác"] =
          (revenueByCategory["Khác"] || 0) + (order.totalAmount || 0);
      }
    }
  });

  const topSellingProducts = products
    .map((p) => ({
      ...p,
      soldCount: Math.floor(Math.random() * 15) + 5, // Logic giả lập bán hàng
      revenue: (p.price || 0) * (Math.floor(Math.random() * 15) + 5),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  if (isAuthLoading || (!isAdminVerified && user) || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-amber-500 flex flex-col items-center justify-center font-mono text-xs tracking-wider gap-4">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-amber-500 rounded-full animate-spin"></div>
        <span className="animate-pulse">
          ⏳ ĐANG KIỂM TRA ĐẶC QUYỀN HỆ THỐNG...
        </span>
      </div>
    );
  }

  if (!user || !isAdminVerified) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans select-none">
      {/* STYLE CSS CHUYÊN DỤNG CHO IN ẤN KHÔNG TỐN MỰC NỀN ĐEN */}
      <style jsx global>{`
        @media print {
          body,
          .min-h-screen,
          main {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          aside,
          button,
          select,
          nav,
          header,
          .flex-1.p-8 > *:not(.printable-report-area) {
            display: none !important;
          }
          .printable-report-area {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            background: white !important;
            color: black !important;
            padding: 20px !important;
          }
          table {
            border-collapse: collapse !important;
            width: 100% !important;
          }
          th,
          td {
            border: 1px solid #d4d4d8 !important;
            color: black !important;
            padding: 8px !important;
            background-color: transparent !important;
          }
          th {
            background-color: #f4f4f5 !important;
            font-weight: bold !important;
          }
        }
      `}</style>

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-66 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between sticky top-0 h-screen">
        <div className="p-6">
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-widest text-amber-500">
              VOLTHOME
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-widest mt-1 font-bold uppercase">
              Management Console
            </p>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "overview", label: "Tổng quan Dashboard", icon: "📊" },
              { id: "analytics", label: "Báo cáo & Thống kê", icon: "📈" },
              { id: "products", label: "Sản phẩm & Kho hàng", icon: "📦" },
              { id: "categories", label: "Quản lý danh mục", icon: "🗂️" },
              { id: "invoices", label: "Quản lý hóa đơn", icon: "📜" },
              { id: "customers", label: "Quản lý khách hàng", icon: "👥" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as AdminTab)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${currentTab === tab.id ? "bg-amber-500 text-zinc-950 font-bold" : "text-zinc-400 hover:bg-zinc-800"}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}

            {/* 🌟 NÚT QUAY VỀ TRANG CHỦ MỚI THÊM VÀO ĐÂY */}
            <div className="pt-6 mt-6 border-t border-zinc-800">
              <a
                href="/"
                target="_blank"
                className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-amber-500 hover:bg-amber-500/10 transition-all duration-300"
              >
                <span>🏠</span>
                <span>Về trang chủ Shop</span>
              </a>
            </div>
          </nav>
        </div>

        {/* Nút thoát Admin */}
        <div className="p-6 border-t border-zinc-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center font-black text-zinc-950 text-xs">
              AH
            </div>
            <div>
              <p className="text-xs font-bold">Admin Hue</p>
              <p className="text-[10px] text-zinc-500 font-medium">
                Cấp quyền tối cao
              </p>
            </div>
          </div>
          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center justify-center gap-2 py-3 border border-rose-500/20 bg-zinc-950 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl text-xs font-bold uppercase transition-all"
          >
            <LogOut size={14} /> Thoát hệ thống
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-8 h-screen overflow-y-auto">
        {/* ========================================================= */}
        {/* KHỐI UI HIỂN THỊ TRÊN WEB (BỊ ẨN KHI IN) */}
        {/* ========================================================= */}
        <div className="block print:hidden space-y-8">
          {/* NÚT XUẤT BÁO CÁO TOÀN CỤC */}
          <div className="flex justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg"
            >
              🖨️ Xuất báo cáo hệ thống
            </button>
          </div>

          {/* TAB 1: TỔNG QUAN */}
          {currentTab === "overview" && (
            <>
              <header className="mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tight">
                  Hệ thống tổng quan
                </h2>
              </header>
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div
                  onClick={() => {
                    setCurrentTab("invoices");
                    setInvoiceFilter("Đã thanh toán");
                  }}
                  className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl shadow-xl cursor-pointer hover:border-amber-500/40 hover:bg-zinc-900/80 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-center text-zinc-500 mb-3 font-bold text-xs tracking-wider group-hover:text-amber-500 transition-colors">
                    <span>TỔNG DOANH THU</span>
                    <span>💰</span>
                  </div>
                  <p className="text-2xl font-black text-amber-400">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalRevenue)}
                  </p>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab("invoices");
                    setInvoiceFilter("Tất cả");
                  }}
                  className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl shadow-xl cursor-pointer hover:border-amber-500/40 hover:bg-zinc-900/80 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-center text-zinc-500 mb-3 font-bold text-xs tracking-wider group-hover:text-amber-500 transition-colors">
                    <span>HÓA ĐƠN THỰC TẾ</span>
                    <span>🛒</span>
                  </div>
                  <p className="text-2xl font-black text-zinc-100">
                    {orders.length} đơn hàng
                  </p>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab("products");
                    setProductSubTab("warehouse_stock");
                  }}
                  className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl shadow-xl cursor-pointer hover:border-amber-500/40 hover:bg-zinc-900/80 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-center text-zinc-500 mb-3 font-bold text-xs tracking-wider group-hover:text-amber-500 transition-colors">
                    <span>THIẾT BỊ TRÊN KHO</span>
                    <span>📦</span>
                  </div>
                  <p className="text-2xl font-black text-zinc-100">
                    {products.length} sản phẩm
                  </p>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab("products");
                    setProductSubTab("warehouse_stock");
                  }}
                  className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl shadow-xl cursor-pointer hover:border-rose-500/40 hover:bg-zinc-900/80 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-center text-zinc-500 mb-3 font-bold text-xs tracking-wider group-hover:text-rose-400 transition-colors">
                    <span>CẢNH BÁO KHO</span>
                    <span>⚠️</span>
                  </div>
                  <p className="text-2xl font-black text-rose-500">
                    {lowStockProducts.length} mặt hàng hết
                  </p>
                </div>
              </section>
            </>
          )}

          {/* TAB 1.5: BÁO CÁO & THỐNG KÊ */}
          {currentTab === "analytics" && (
            <div className="space-y-8 animate-in fade-in duration-400">
              <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-6">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-amber-500">
                    📈 Trung tâm phân tích & Báo cáo
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    Hệ thống thống kê thông minh, biểu đồ trực quan hóa dữ liệu
                    doanh thu và hiệu suất bán hàng.
                  </p>
                </div>
              </header>

              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span>📊</span> Phân bổ doanh thu theo ngành hàng
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(revenueByCategory).map(
                      ([catSlug, revAmount]) => {
                        const maxRev = Math.max(
                          ...Object.values(revenueByCategory),
                          1,
                        );
                        const percentage = Math.min(
                          (revAmount / maxRev) * 100,
                          100,
                        );
                        return (
                          <div key={catSlug} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-zinc-400 uppercase tracking-wider">
                                📁 Ngành hàng: {catSlug}
                              </span>
                              <span className="text-amber-400 font-mono">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(revAmount)}
                              </span>
                            </div>
                            <div className="w-full h-3 bg-zinc-950 border border-zinc-800/80 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-600 to-[#C9A63F] rounded-full transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span>🎯</span> Tỷ lệ trạng thái đơn hàng
                  </h3>
                  <div className="flex-1 flex flex-col justify-center space-y-4 py-4">
                    {[
                      {
                        label: "Thành công / Đã thanh toán",
                        count: statusCounts.confirmed,
                        color: "bg-emerald-500",
                      },
                      {
                        label: "Đang chờ xử lý hệ thống",
                        count: statusCounts.pending,
                        color: "bg-amber-500",
                      },
                      {
                        label: "Yêu cầu hủy vĩnh viễn",
                        count: statusCounts.cancelled,
                        color: "bg-rose-500",
                      },
                    ].map((item, idx) => {
                      const total =
                        statusCounts.confirmed +
                          statusCounts.pending +
                          statusCounts.cancelled || 1;
                      const pct = ((item.count / total) * 100).toFixed(1);
                      return (
                        <div
                          key={idx}
                          className="bg-zinc-950 p-3.5 border border-zinc-800 rounded-xl flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`w-3 h-3 rounded-full ${item.color}`}
                            />
                            <span className="text-xs font-semibold text-zinc-400">
                              {item.label}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-black text-white">
                            {item.count} đơn ({pct}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-zinc-800 bg-zinc-950/20">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span>🏆</span> Top 5 tuyệt tác công nghệ bán chạy nhất
                  </h3>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-950/50 border-b border-zinc-800 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                      <th className="p-4">Sản phẩm</th>
                      <th className="p-4">Phân loại</th>
                      <th className="p-4 text-center">Số lượng bán</th>
                      <th className="p-4 text-right">Tổng doanh thu mang về</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/30 text-sm font-medium">
                    {topSellingProducts.map((p, idx) => (
                      <tr
                        key={p.id}
                        className="hover:bg-zinc-800/10 transition-colors group"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-mono font-bold text-amber-500 w-5">
                              0{idx + 1}
                            </span>
                            <span className="font-bold text-zinc-200 group-hover:text-amber-500 transition-colors">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border text-amber-400 bg-zinc-950 border-zinc-800">
                            {p.category}
                          </span>
                        </td>
                        <td className="p-4 text-center font-mono font-bold text-zinc-300">
                          {p.soldCount} thiết bị
                        </td>
                        <td className="p-4 text-right font-mono font-black text-amber-400">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(p.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          )}

          {/* TAB 2: SẢN PHẨM & KHO HÀNG */}
          {currentTab === "products" && (
            <div className="space-y-8">
              <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-zinc-900 pb-6">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-amber-500">
                    Sản phẩm & Kho hàng
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1 font-medium">
                    Hệ thống cập nhật thông tin giá cả, số lượng và CRUD thiết
                    bị trực tiếp.
                  </p>
                </div>
                <div className="flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl shadow-inner">
                  <button
                    onClick={() => {
                      setProductSubTab("product_crud");
                      setEditingId(null);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${productSubTab === "product_crud" ? "bg-amber-500 text-zinc-950 shadow-md" : "text-zinc-500 hover:text-white"}`}
                  >
                    🛠️ Giao diện rút gọn
                  </button>
                  <button
                    onClick={() => {
                      setProductSubTab("warehouse_stock");
                      setEditingId(null);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${productSubTab === "warehouse_stock" ? "bg-amber-500 text-zinc-950 shadow-md" : "text-zinc-500 hover:text-white"}`}
                  >
                    🏭 Bảng quản lý kho chính
                  </button>
                </div>
              </header>

              {productSubTab === "warehouse_stock" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl shadow-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                          TỔNG SỐ LƯỢNG HÀNG LƯU KHO
                        </span>
                        <span className="text-3xl font-black text-zinc-100 mt-1 block">
                          {totalItemsInWarehouse} cái
                        </span>
                      </div>
                      <span className="text-3xl p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                        📦
                      </span>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl shadow-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                          TỔNG GIÁ TRỊ VỐN TỒN KHO
                        </span>
                        <span className="text-3xl font-black text-amber-400 mt-1 block">
                          {new Intl.NumberFormat("vi-VN").format(
                            totalWarehouseValue,
                          )}
                          đ
                        </span>
                      </div>
                      <span className="text-3xl p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                        💰
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl">
                    <p className="text-xs font-medium text-zinc-400 italic">
                      Thao tác Thêm nhanh sản phẩm mới hoặc Chỉnh sửa trực tiếp
                      tại bảng danh mục phía dưới.
                    </p>
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-md"
                    >
                      {showAddForm
                        ? "✖️ Đóng form"
                        : "➕ Thêm sản phẩm vào kho"}
                    </button>
                  </div>

                  {showAddForm && (
                    <div className="flex justify-center border-b border-zinc-900 pb-8">
                      <ProductForm />
                    </div>
                  )}

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-950/50 border-b border-zinc-800 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                          <th className="p-5">Mô tả thiết bị kho</th>
                          <th className="p-5">Giá bán lẻ</th>
                          <th className="p-5">Hàng tồn</th>
                          <th className="p-5">Biểu đồ</th>
                          <th className="p-5">Ngành hàng</th>
                          <th className="p-5 text-center">Tác vụ quản trị</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/30 text-sm font-medium">
                        {products.map((p) => {
                          const isCurrentEditing = editingId === p.id;
                          return (
                            <tr
                              key={p.id}
                              className="hover:bg-zinc-800/10 transition-colors group"
                            >
                              <td className="p-5">
                                {isCurrentEditing ? (
                                  <input
                                    type="text"
                                    value={editFormData.name}
                                    onChange={(e) =>
                                      setEditFormData({
                                        ...editFormData,
                                        name: e.target.value,
                                      })
                                    }
                                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 outline-none w-full text-white"
                                  />
                                ) : (
                                  <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden p-1">
                                      <img
                                        src={p.image}
                                        className="w-full h-full object-contain"
                                        alt=""
                                      />
                                    </div>
                                    <span className="font-bold text-zinc-200 group-hover:text-amber-500 transition-colors">
                                      {p.name}
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td className="p-5">
                                {isCurrentEditing ? (
                                  <input
                                    type="number"
                                    value={editFormData.price}
                                    onChange={(e) =>
                                      setEditFormData({
                                        ...editFormData,
                                        price: e.target.value,
                                      })
                                    }
                                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 outline-none w-32 font-mono text-white"
                                  />
                                ) : (
                                  <span className="font-mono text-zinc-400 font-bold">
                                    {new Intl.NumberFormat("vi-VN").format(
                                      p.price || 0,
                                    )}
                                    đ
                                  </span>
                                )}
                              </td>
                              <td className="p-5">
                                {isCurrentEditing ? (
                                  <input
                                    type="number"
                                    value={editFormData.stock}
                                    onChange={(e) =>
                                      setEditFormData({
                                        ...editFormData,
                                        stock: e.target.value,
                                      })
                                    }
                                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 outline-none w-20 font-mono text-white"
                                  />
                                ) : (
                                  <span className="font-mono font-black text-base text-zinc-100">
                                    {p.stock} chiếc
                                  </span>
                                )}
                              </td>
                              <td className="p-5">
                                <div className="w-24 h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                                  <div
                                    className={`h-full ${p.stock === 0 ? "bg-rose-500" : p.stock < 5 ? "bg-amber-500" : "bg-emerald-500"}`}
                                    style={{
                                      width: `${Math.min(((p.stock || 0) / 30) * 100, 100)}%`,
                                    }}
                                  ></div>
                                </div>
                              </td>
                              <td className="p-5">
                                {isCurrentEditing ? (
                                  <select
                                    value={editFormData.category}
                                    onChange={(e) =>
                                      setEditFormData({
                                        ...editFormData,
                                        category: e.target.value,
                                      })
                                    }
                                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-2 text-xs text-amber-400 outline-none"
                                  >
                                    {categories.map((c) => (
                                      <option key={c.id} value={c.slug}>
                                        📁 {c.slug}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border text-amber-400 bg-zinc-950 border-zinc-800">
                                    {p.category}
                                  </span>
                                )}
                              </td>
                              <td className="p-5 text-center">
                                {isCurrentEditing ? (
                                  <div className="flex items-center justify-center space-x-2">
                                    <button
                                      onClick={() => handleSaveEdit(p.id)}
                                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-black text-xs font-black rounded-lg shadow-md"
                                    >
                                      💾 Lưu
                                    </button>
                                    <button
                                      onClick={() => setEditingId(null)}
                                      className="px-3 py-1.5 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-lg border border-zinc-700/50"
                                    >
                                      Hủy
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center space-x-2">
                                    <button
                                      onClick={() => handleStartEdit(p)}
                                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg border border-zinc-700/30"
                                    >
                                      ✏️ Sửa
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteProductReal(p.id, p.name)
                                      }
                                      className="px-3 py-1.5 bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 text-xs font-bold rounded-lg border border-rose-900/20"
                                    >
                                      🗑️ Xóa
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: QUẢN LÝ DANH MỤC */}
          {currentTab === "categories" && (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
              <header>
                <h2 className="text-2xl font-black uppercase tracking-wider text-amber-500">
                  🗂️ Cấu trúc cây danh mục
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  Hệ thống quản lý phân loại ngành hàng, đồng bộ hóa trực tiếp
                  cơ sở dữ liệu.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dynamicCategoryStats.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between shadow-xl border-zinc-800/80"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                        {cat.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-white text-base">
                          {cat.name}
                        </h4>
                        <p className="text-xs font-mono text-zinc-500 mt-0.5">
                          slug: {cat.slug}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-amber-400 block">
                        {cat.count}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Thiết bị
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl">
                <p className="text-xs font-medium text-zinc-400 italic">
                  Khởi tạo thêm ngành hàng công nghệ mới hoặc thay đổi mã định
                  danh slug hệ thống.
                </p>
                <button
                  onClick={() => setShowCatForm(!showCatForm)}
                  className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-md"
                >
                  {showCatForm
                    ? "✖️ Đóng khung form"
                    : "➕ Khởi tạo danh mục mới"}
                </button>
              </div>

              {showCatForm && (
                <form
                  onSubmit={handleAddCategory}
                  className="bg-[#0A0A0A] border border-zinc-800 p-6 rounded-2xl space-y-4 max-w-xl mx-auto animate-in slide-in-from-top-4 duration-300"
                >
                  <h3 className="text-sm font-black text-amber-500 uppercase tracking-wider">
                    Mở kho lưu trữ danh mục mới
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Tên hiển thị (VD: SmartWatch)"
                      value={newCatData.name}
                      onChange={(e) =>
                        setNewCatData({ ...newCatData, name: e.target.value })
                      }
                      className="col-span-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Mã slug viết liền (VD: watch)"
                      value={newCatData.slug}
                      onChange={(e) =>
                        setNewCatData({ ...newCatData, slug: e.target.value })
                      }
                      className="col-span-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Emoji icon (VD: ⌚)"
                      value={newCatData.icon}
                      onChange={(e) =>
                        setNewCatData({ ...newCatData, icon: e.target.value })
                      }
                      className="col-span-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 text-center"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-md"
                  >
                    Đẩy danh mục lên mây
                  </button>
                </form>
              )}

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-950/50 border-b border-zinc-800 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                      <th className="p-4">Biểu tượng</th>
                      <th className="p-4">Tên ngành hàng</th>
                      <th className="p-4">Mã hệ thống (Slug)</th>
                      <th className="p-4 text-center">Tác vụ quản trị</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/30 text-sm font-medium">
                    {categories.map((cat) => {
                      const isEditingCat = editingCatId === cat.id;
                      return (
                        <tr
                          key={cat.id}
                          className="hover:bg-zinc-800/10 transition-colors"
                        >
                          <td className="p-4 text-xl w-24">
                            {isEditingCat ? (
                              <input
                                type="text"
                                value={editCatFormData.icon}
                                onChange={(e) =>
                                  setEditCatFormData({
                                    ...editCatFormData,
                                    icon: e.target.value,
                                  })
                                }
                                className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-center w-12 text-sm text-white"
                              />
                            ) : (
                              <span className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg block w-max">
                                {cat.icon}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-zinc-200">
                            {isEditingCat ? (
                              <input
                                type="text"
                                value={editCatFormData.name}
                                onChange={(e) =>
                                  setEditCatFormData({
                                    ...editCatFormData,
                                    name: e.target.value,
                                  })
                                }
                                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                              />
                            ) : (
                              <span className="font-bold">{cat.name}</span>
                            )}
                          </td>
                          <td className="p-4 font-mono text-zinc-400">
                            {isEditingCat ? (
                              <input
                                type="text"
                                value={editCatFormData.slug}
                                onChange={(e) =>
                                  setEditCatFormData({
                                    ...editCatFormData,
                                    slug: e.target.value,
                                  })
                                }
                                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                              />
                            ) : (
                              <span>{cat.slug}</span>
                            )}
                          </td>
                          <td className="p-4">
                            {isEditingCat ? (
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => handleSaveEditCat(cat.id)}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-black text-xs font-black rounded-lg shadow-md"
                                >
                                  💾 Lưu
                                </button>
                                <button
                                  onClick={() => setEditingCatId(null)}
                                  className="px-3 py-1.5 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-lg border border-zinc-700/50"
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => handleStartEditCat(cat)}
                                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg border border-zinc-700/30"
                                >
                                  ✏️ Sửa
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteCategoryReal(cat.id, cat.name)
                                  }
                                  className="px-3 py-1.5 bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 text-xs font-bold rounded-lg border border-rose-900/20"
                                >
                                  🗑️ Xóa
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: QUẢN LÝ HÓA ĐƠN */}
          {currentTab === "invoices" && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
              <header className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-wider text-amber-500">
                    📜 Sổ quản lý hóa đơn
                  </h2>
                </div>
                <div className="flex gap-1.5 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-bold">
                  {["Tất cả", "Chờ xác nhận", "Đã thanh toán", "Đã hủy"].map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => setInvoiceFilter(st)}
                        className={`px-3 py-2 rounded-lg transition-all ${invoiceFilter === st ? "bg-amber-500 text-zinc-950" : "text-zinc-400 hover:text-white"}`}
                      >
                        {st}
                      </button>
                    ),
                  )}
                </div>
              </header>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-950/40 text-zinc-500 text-[11px] font-bold tracking-widest uppercase">
                      <th className="p-4">Mã hóa đơn</th>
                      <th className="p-4">Khách hàng</th>
                      <th className="p-4">Ngày đặt hàng</th>
                      <th className="p-4">Phương thức</th>
                      <th className="p-4">Giá trị giao dịch</th>
                      <th className="p-4 text-center">Trạng thái xử lý đơn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40 text-sm font-medium">
                    {orders
                      .filter(
                        (o) =>
                          invoiceFilter === "Tất cả" ||
                          (o.status || "Chờ xác nhận") === invoiceFilter,
                      )
                      .map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-zinc-800/20 transition-all"
                        >
                          <td className="p-4 font-mono text-amber-500 text-xs font-bold">
                            {order.id}
                          </td>
                          <td className="p-4 text-zinc-200">
                            <div>
                              <p className="font-bold text-zinc-200">
                                {order.customerInfo?.name || "Khách lẻ"}
                              </p>
                              <p className="text-[11px] text-zinc-500 font-normal mt-0.5">
                                {order.customerInfo?.phone || "Không rõ"}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-zinc-400 text-xs">
                            {order.createdAt || order.date_order
                              ? new Date(
                                  order.createdAt || order.date_order,
                                ).toLocaleString("vi-VN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Chưa cập nhật"}
                          </td>
                          <td className="p-4">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border text-zinc-300 bg-zinc-950 border-zinc-800">
                              {order.payment_method || "COD"}
                            </span>
                          </td>
                          <td className="p-4 font-black text-zinc-100">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(order.totalAmount)}
                          </td>
                          <td className="p-4 text-center">
                            <select
                              value={order.status || "Chờ xác nhận"}
                              onChange={(e) =>
                                handleUpdateStatus(order.id, e.target.value)
                              }
                              className="bg-zinc-950 border border-zinc-800 text-xs font-bold text-amber-400 rounded-lg px-3 py-2 focus:border-amber-500 outline-none text-center cursor-pointer"
                            >
                              <option value="Chờ xác nhận">
                                ⏳ Chờ xác nhận
                              </option>
                              <option value="Đã thanh toán">
                                ✅ Đã thanh toán
                              </option>
                              <option value="Đang giao hàng">
                                🚚 Đang giao hàng
                              </option>
                              <option value="Đã hủy">❌ Đã hủy đơn</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: QUẢN LÝ KHÁCH HÀNG */}
          {currentTab === "customers" && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
              <header>
                <h2 className="text-2xl font-black uppercase tracking-wider text-amber-500">
                  👥 Cơ sở dữ liệu khách hàng
                </h2>
              </header>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-950/40 text-zinc-500 text-[11px] font-bold tracking-widest uppercase">
                      <th className="p-4">Tên khách hàng</th>
                      <th className="p-4">Số điện thoại</th>
                      <th className="p-4 text-center">Tổng số đơn đặt</th>
                      <th className="p-4">Tổng chi tiêu tích lũy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40 text-sm font-medium">
                    {Object.values(customerMap).map((cust: any, index) => (
                      <tr
                        key={index}
                        className="hover:bg-zinc-800/20 transition-all"
                      >
                        <td className="p-4 text-zinc-100 font-bold">
                          {cust.name}
                        </td>
                        <td className="p-4 font-mono text-zinc-400 text-xs">
                          {cust.phone}
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-xs font-bold text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-md">
                            {cust.totalOrders} đơn
                          </span>
                        </td>
                        <td className="p-4 font-black text-amber-400">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(cust.totalSpent)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* KHỐI UI PHÔI BÁO CÁO IN ẤN (BỊ ẨN TRÊN WEB, CHỈ HIỂN THỊ KHI IN PDF) */}
        {/* ========================================================= */}
        <div className="hidden printable-report-area font-serif text-black p-10 bg-white">
          <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-8">
            <div className="text-left">
              <p className="font-bold text-sm tracking-wider uppercase">
                HỆ THỐNG CỬA HÀNG ĐIỆN TỬ VOLTHOME
              </p>
              <p className="text-xs italic text-gray-600">
                Bộ phận: Quản lý Console & Kinh doanh
              </p>
            </div>
          </div>

          <div className="text-center my-10">
            <h1 className="text-2xl font-bold uppercase tracking-wide">
              BÁO CÁO HOẠT ĐỘNG KINH DOANH VÀ THỐNG KÊ TỒN KHO
            </h1>
            <p className="text-xs italic text-gray-700 mt-2">
              Ngày xuất bản biểu: {new Date().toLocaleDateString("vi-VN")} -
              Người thực hiện: Đỗ Thị Cúc Huệ
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase mb-4 border-l-4 border-black pl-2">
              I. Chỉ số doanh thu & Vận hành kho
            </h3>
            <table className="w-full text-left border-collapse border border-zinc-300">
              <thead>
                <tr className="bg-zinc-100 font-bold">
                  <th className="p-3 border border-zinc-300 text-xs">
                    Chỉ số tài chính / Vận hành
                  </th>
                  <th className="p-3 border border-zinc-300 text-xs text-right">
                    Giá trị tổng hợp hệ thống
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-zinc-300 text-sm">
                    💰 1. Tổng doanh thu cửa hàng (Hóa đơn thực tế thành công)
                  </td>
                  <td className="p-3 border border-zinc-300 text-sm font-bold text-right">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalRevenue)}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-zinc-300 text-sm">
                    📦 2. Tổng số lượng hàng hóa đang lưu giữ tại kho hàng
                  </td>
                  <td className="p-3 border border-zinc-300 text-sm font-bold text-right">
                    {totalItemsInWarehouse} thiết bị
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-zinc-300 text-sm">
                    🪙 3. Tổng giá trị vốn bằng tiền lưu trong kho sản phẩm
                  </td>
                  <td className="p-3 border border-zinc-300 text-sm font-bold text-right">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalWarehouseValue)}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-zinc-300 text-sm">
                    📜 4. Tổng khối lượng đơn đặt đặt hàng (Hóa đơn thực tế)
                  </td>
                  <td className="p-3 border border-zinc-300 text-sm font-bold text-right">
                    {orders.length} hóa đơn
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase mb-4 border-l-4 border-black pl-2">
              II. Cơ cấu doanh thu theo ngành hàng
            </h3>
            <table className="w-full text-left border-collapse border border-zinc-300">
              <thead>
                <tr className="bg-zinc-100 font-bold">
                  <th className="p-3 border border-zinc-300 text-xs">
                    Ngành hàng sản phẩm (Mã Slug)
                  </th>
                  <th className="p-3 border border-zinc-300 text-xs text-right">
                    Tổng số tiền thu về (VND)
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(revenueByCategory).map(
                  ([catSlug, revAmount]) => (
                    <tr key={catSlug}>
                      <td className="p-3 border border-zinc-300 text-sm uppercase">
                        Ngành hàng: {catSlug}
                      </td>
                      <td className="p-3 border border-zinc-300 text-sm text-right font-mono">
                        {new Intl.NumberFormat("vi-VN").format(revAmount)} đ
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase mb-4 border-l-4 border-black pl-2">
              III. Danh sách 5 sản phẩm bán chạy nhất
            </h3>
            <table className="w-full text-left border-collapse border border-zinc-300">
              <thead>
                <tr className="bg-zinc-100 font-bold">
                  <th className="p-3 border border-zinc-300 text-xs">
                    Tên sản phẩm thiết bị
                  </th>
                  <th className="p-3 border border-zinc-300 text-xs">
                    Danh mục
                  </th>
                  <th className="p-3 border border-zinc-300 text-xs text-center">
                    Lượng bán ước tính
                  </th>
                  <th className="p-3 border border-zinc-300 text-xs text-right">
                    Tổng doanh số mang về
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="p-3 border border-zinc-300 text-sm">
                      0{idx + 1}. {p.name}
                    </td>
                    <td className="p-3 border border-zinc-300 text-xs uppercase">
                      {p.category}
                    </td>
                    <td className="p-3 border border-zinc-300 text-sm text-center font-mono">
                      {p.soldCount} cái
                    </td>
                    <td className="p-3 border border-zinc-300 text-sm text-right font-bold">
                      {new Intl.NumberFormat("vi-VN").format(p.revenue)} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 flex justify-between text-center font-serif">
            <div className="w-48">
              <p className="text-xs italic text-gray-500 mb-1">
                Quy Nhơn, Ngày.....Tháng.....Năm 2026
              </p>
              <p className="font-bold text-sm uppercase">Người Lập Báo Cáo</p>
              <p className="text-xs text-zinc-400 mt-1">(Ký, ghi rõ họ tên)</p>
              <div className="h-20"></div>
              <p className="font-bold text-sm italic text-zinc-800">
                Đỗ Thị Cúc Huệ
              </p>
            </div>
            <div className="w-48">
              <p className="text-xs italic text-gray-500 mb-1">
                Duyệt hệ thống dữ liệu đám mây
              </p>
              <p className="font-bold text-sm uppercase">Người Phê Duyệt</p>
              <p className="text-xs text-zinc-400 mt-1">
                (Ký tên, đóng dấu bản in)
              </p>
              <div className="h-20"></div>
              <p className="font-bold text-sm text-zinc-400">
                ...........................................
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODAL XÁC NHẬN ĐĂNG XUẤT */}
        {/* ========================================================= */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center">
              <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="text-rose-500" size={32} />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">
                Đăng xuất?
              </h3>
              <p className="text-zinc-400 text-sm mb-8">
                Bạn có chắc chắn muốn rời khỏi phiên quản trị hệ thống không?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold text-sm transition-all text-white"
                >
                  Tiếp tục
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] text-white"
                >
                  Xác nhận thoát
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
