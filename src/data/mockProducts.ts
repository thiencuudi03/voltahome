// src/data/mockProducts.ts
import { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: 'MacBook Pro M3 Max 14" - Black Edition',
    description:
      "Chip M3 Max cực khủng với 14-core CPU và 30-core GPU, bộ nhớ thống nhất 36GB.",
    price: 79990000,
    image: "/images/products/macbook-m3.png",
    category: "Laptop",
    stock: 5,
    rating: 5,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max 256GB - Titanium",
    description:
      "Thiết kế Titan bền bỉ, chip A17 Pro mạnh mẽ nhất từng có trên smartphone.",
    price: 34990000,
    image: "/images/products/iphone-15.png",
    category: "Điện thoại",
    stock: 12,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description:
      "Chống ồn đỉnh cao, chất âm trung thực, thời lượng pin lên đến 30 giờ.",
    price: 8450000,
    image: "/images/products/sony-wh1000xm5.png",
    category: "Tai nghe",
    stock: 20,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Bàn phím cơ Custom VoltKey G65",
    description:
      "Thiết kế tối giản, switch cơ học cao cấp, hỗ trợ thay thế nóng (hot-swap).",
    price: 2500000,
    image: "/images/products/keyboard-volt.png",
    category: "Phụ kiện",
    stock: 15,
    rating: 4.7,
  },
  {
    id: "5",
    name: 'iPad Pro M2 12.9" Liquid Retina XDR',
    description:
      "Màn hình hiển thị xuất sắc nhất thế giới, hỗ trợ Apple Pencil 2.",
    price: 28990000,
    category: "Máy tính bảng",
    image: "/images/products/ipad-pro.png",
    stock: 8,
    rating: 4.9,
  },
  {
    id: "6",
    name: "Samsung Galaxy S24 Ultra - Gray",
    description: "Tích hợp AI quyền năng, bút S-Pen tiện lợi và camera 200MP.",
    price: 29990000,
    image: "/images/products/s24-ultra.png",
    category: "Điện thoại",
    stock: 10,
    rating: 4.8,
  },
];
