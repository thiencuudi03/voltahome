import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1", // SỬA: Luôn dùng chuỗi (string) để khớp với URL params
    name: "MacBook Pro 16 M3 Max",
    description:
      "Cấu hình mạnh nhất với chip M3 Max, 128GB RAM và màn hình Liquid Retina XDR 16 inch đỉnh cao dành cho đồ họa chuyên nghiệp.",
    price: 89990000,
    image: "/images/products/macbook-m3.png",
    category: "Laptop Premium",
    stock: 5,
    rating: 5,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max Titanium",
    description:
      "Khung viền Titanium siêu bền, chip A17 Pro và hệ thống camera zoom quang học 5x dẫn đầu công nghệ di động.",
    price: 34990000,
    image: "/images/products/iphone-15.png",
    category: "Điện thoại",
    stock: 12,
    rating: 4.8,
  },
  {
    id: "3",
    name: "AirPods Max Space Gray",
    description:
      "Sự kết hợp hoàn hảo giữa âm thanh độ trung thực cao và thiết kế tối giản, chống ồn chủ động vượt trội.",
    price: 13900000,
    image: "/images/products/airpods-max.png",
    category: "Phụ kiện cao cấp",
    stock: 20,
    rating: 4.7,
  },
  {
    id: "4",
    name: "iPad Pro M2 12.9-inch",
    description:
      "Màn hình mini-LED rực rỡ, sức mạnh từ chip M2 giúp xử lý mọi tác vụ sáng tạo một cách mượt mà nhất.",
    price: 31900000,
    image: "/images/products/ipad-pro.png",
    category: "Laptop Premium",
    stock: 8,
    rating: 4.9,
  },
  {
    id: "5",
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Quyền năng AI đỉnh cao, màn hình phẳng 2600 nits và bút S-Pen tích hợp đầy tiện dụng.",
    price: 29990000,
    image: "/images/products/s24-ultra.png",
    category: "Điện thoại",
    stock: 10,
    rating: 4.6,
  },
  {
    id: "6",
    name: "Smart Lighting System",
    description:
      "Hệ thống chiếu sáng thông minh điều khiển qua điện thoại, mang lại không gian sống hiện đại và tinh tế.",
    price: 4500000,
    image: "/images/products/smart-light.png",
    category: "Thiết bị SmartHome",
    stock: 50,
    rating: 4.5,
  },
];
