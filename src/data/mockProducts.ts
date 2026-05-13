import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  // ==========================================
  // 1. CÁC SẢN PHẨM GỐC CỦA BẠN (Đã chuẩn hóa Category & Giá)
  // ==========================================
  {
    id: "1",
    name: 'MacBook Pro M3 Max 14" - Black Edition',
    description:
      "Chip M3 Max cực khủng với 14-core CPU và 30-core GPU, bộ nhớ thống nhất 36GB.",
    price: 29000000,
    image: "/images/products/macbook-m3.png",
    images: [
      "/images/products/macbook-m3.png",
      "/images/products/macbook-m4.png",
      "/images/products/macbook-m5.png",
      "/images/products/macbook-m6.png",
    ],
    category: "Laptop",
    stock: 5,
    rating: 5,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max 256GB - Titanium",
    description:
      "Thiết kế Titan bền bỉ, chip A17 Pro mạnh mẽ nhất từng có trên smartphone.",
    price: 47800000,
    image: "/images/products/iphone-15.png",
    images: [
      "/images/products/iphone-15.png",
      "/images/products/iphone-15.png",
      "/images/products/iphone-15.png",
    ],
    category: "Điện thoại",
    stock: 12,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description:
      "Chống ồn đỉnh cao, chất âm trung thực, thời lượng pin lên đến 30 giờ.",
    price: 7450000,
    image: "/images/products/sony-wh1000xm5.png",
    images: [
      "/images/products/sony-wh1000xm5.png",
      "/images/products/sony-wh1000xm5.png",
      "/images/products/sony-wh1000xm5.png",
    ],
    category: "Phụ kiện",
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
    images: [
      "/images/products/keyboard-volt.png",
      "/images/products/keyboard-volt.png",
      "/images/products/keyboard-volt.png",
    ],
    category: "Phụ kiện",
    stock: 15,
    rating: 4.7,
  },
  {
    id: "5",
    name: 'iPad Pro M2 12.9" Liquid Retina XDR',
    description:
      "Màn hình hiển thị xuất sắc nhất thế giới, hỗ trợ Apple Pencil 2.",
    price: 25000000,
    image: "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    images: [
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    ],
    category: "Laptop",
    stock: 8,
    rating: 4.9,
  },
  {
    id: "6",
    name: "Samsung Galaxy S24 Ultra - Gray",
    description: "Tích hợp AI quyền năng, bút S-Pen tiện lợi và camera 200MP.",
    price: 37420000,
    image: "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
    images: [
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
    ],
    category: "Điện thoại",
    stock: 10,
    rating: 4.8,
  },

  // ==========================================
  // 2. CÁC SẢN PHẨM BỔ SUNG THÊM ĐỂ TEST BỘ LỌC
  // ==========================================
  {
    id: "lap-3",
    name: "Dell XPS 13 Plus - Platinum",
    description:
      "Thiết kế tương lai với dải phím cảm ứng tàng hình và trackpad liền mạch.",
    price: 45000000,
    image: "/images/products/macbook-m3.png",
    images: [
      "/images/products/macbook-m3.png",
      "/images/products/macbook-m3.png",
      "/images/products/macbook-m3.png",
    ],
    category: "Laptop",
    stock: 8,
    rating: 4.7,
  },
  {
    id: "lap-6",
    name: "MacBook Pro 16-inch M3 Max 36GB/1TB",
    description:
      "Quái vật đồ họa. Giới hạn duy nhất là trí tưởng tượng của bạn.",
    price: 79990000,
    image: "/images/products/macbook-m3.png",
    images: [
      "/images/products/macbook-m3.png",
      "/images/products/macbook-m3.png",
      "/images/products/macbook-m3.png",
    ],
    category: "Laptop",
    stock: 3,
    rating: 5.0,
  },
  {
    id: "phone-5",
    name: "Samsung Galaxy Z Fold 5 - Phantom Black",
    description:
      "Mở ra tương lai. Gập lại là smartphone, mở ra là không gian làm việc.",
    price: 40990000,
    image: "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
    images: [
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
    ],
    category: "Điện thoại",
    stock: 8,
    rating: 4.7,
  },
  {
    id: "phone-7",
    name: "Huawei Mate 60 RS Ultimate Design",
    description:
      "Phiên bản giới hạn, chế tác từ gốm sứ tinh xảo kết hợp viền kim loại.",
    price: 65000000,
    image: "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
    images: [
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
      "/images/products/Samsung Galaxy S24 Ultra - Gray.png",
    ],
    category: "Điện thoại",
    stock: 1,
    rating: 4.9,
  },
  {
    id: "acc-1",
    name: "Chuột Logitech MX Master 3S",
    description:
      "Độ nhạy siêu cao, cuộn từ tính tĩnh lặng, thiết kế công thái học.",
    price: 3200000,
    image: "/images/products/keyboard-volt.png",
    images: [
      "/images/products/keyboard-volt.png",
      "/images/products/keyboard-volt.png",
      "/images/products/keyboard-volt.png",
    ],
    category: "Phụ kiện",
    stock: 40,
    rating: 4.8,
  },
  {
    id: "acc-7",
    name: "Màn hình Pro Display XDR",
    description:
      "Màn hình tham chiếu tốt nhất thế giới dành cho studio chuyên nghiệp.",
    price: 120000000,
    image: "/images/products/macbook-m3.png",
    images: [
      "/images/products/macbook-m3.png",
      "/images/products/macbook-m3.png",
      "/images/products/macbook-m3.png",
    ],
    category: "Phụ kiện",
    stock: 2,
    rating: 5.0,
  },
  {
    id: "home-1",
    name: "Đèn thông minh Philips Hue Sync",
    description:
      "Biến đổi không gian bằng ánh sáng, đồng bộ hoàn hảo với cảm xúc.",
    price: 8500000,
    image: "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    images: [
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    ],
    category: "Thiết bị SmartHome",
    stock: 25,
    rating: 4.7,
  },
  {
    id: "home-4",
    name: "Robot Hút Bụi Dreame L20 Ultra",
    description:
      "Giải phóng sức lao động. Tự động hoàn toàn từ giặt giẻ đến đổ rác.",
    price: 24000000,
    image: "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    images: [
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    ],
    category: "Thiết bị SmartHome",
    stock: 15,
    rating: 4.8,
  },
  {
    id: "home-7",
    name: "Smart TV LG OLED Evo 8K 88-inch",
    description:
      "Trải nghiệm điện ảnh choáng ngợp tại gia. Thiết kế mỏng như tờ giấy.",
    price: 250000000,
    image: "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    images: [
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
      "/images/products/iPad Pro M2 12.9 Liquid Retina XDR.png",
    ],
    category: "Thiết bị SmartHome",
    stock: 1,
    rating: 5.0,
  },
];
