"use client";

import React, { useState } from "react";
import { addFirebaseProduct } from "@/services/productService";

export default function ProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "laptop",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const result = await addFirebaseProduct(formData);

    if (result.success) {
      setMessage("✅ Thêm siêu phẩm công nghệ thành công!");
      // Reset form sạch sẽ để nhập cái tiếp theo
      setFormData({
        name: "",
        price: "",
        category: "laptop",
        stock: "",
        image: "",
        description: "",
      });
    } else {
      setMessage("❌ Có lỗi xảy ra khi đẩy lên Firebase.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-2xl text-white shadow-2xl">
      <h2 className="text-2xl font-black uppercase tracking-widest text-[#C9A63F] mb-6 border-b border-white/5 pb-4">
        Thêm Thiết Bị Mới
      </h2>

      {message && (
        <div
          className={`p-4 mb-6 rounded-lg text-sm font-bold ${message.includes("✅") ? "bg-green-900/30 text-green-400 border border-green-500/20" : "bg-red-900/30 text-red-400 border border-red-500/20"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tên sản phẩm */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">
              Tên sản phẩm
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C9A63F] outline-none transition-all text-white"
              placeholder="VD: MacBook Pro M3..."
            />
          </div>

          {/* Mức giá */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">
              Giá (VNĐ)
            </label>
            <input
              required
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C9A63F] outline-none transition-all text-white"
              placeholder="VD: 29000000"
            />
          </div>

          {/* Danh mục */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">
              Danh mục
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C9A63F] outline-none transition-all text-white"
            >
              <option value="laptop">MacBook & Laptop</option>
              <option value="iphone">iPhone</option>
              <option value="samsung">Samsung</option>
              <option value="audio">Tai nghe</option>
              <option value="accessory">Phụ kiện</option>
            </select>
          </div>

          {/* Tồn kho */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">
              Số lượng kho
            </label>
            <input
              required
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C9A63F] outline-none transition-all text-white"
              placeholder="VD: 15"
            />
          </div>
        </div>

        {/* Link ảnh */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">
            Đường dẫn Hình ảnh (URL)
          </label>
          <input
            required
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#C9A63F] outline-none transition-all text-white"
            placeholder="VD: /images/products/macbook-m3.png"
          />
        </div>

        {/* Nút gửi dữ liệu */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#C9A63F] hover:bg-[#b08e36] text-black font-black uppercase tracking-widest py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg shadow-[#C9A63F]/10"
        >
          {isSubmitting ? "Đang đẩy lên mây..." : "Kích hoạt lưu sản phẩm"}
        </button>
      </form>
    </div>
  );
}
