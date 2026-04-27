export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    price: 34990000,
    image: "/images/iphone-16-pro-max.jpg",
    category: "Điện thoại",
    description: "Hiệu năng mạnh mẽ, camera chuyên nghiệp.",
  },
  {
    id: 2,
    name: "MacBook Air M4",
    price: 28990000,
    image: "/images/macbook-air-m4.jpg",
    category: "Laptop",
    description: "Mỏng nhẹ, pin lâu, hiệu năng vượt trội.",
  },
  {
    id: 3,
    name: "iPad Pro M4",
    price: 26990000,
    image: "/images/ipad-pro-m4.jpg",
    category: "Tablet",
    description: "Màn hình đỉnh cao cho sáng tạo chuyên nghiệp.",
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    price: 5990000,
    image: "/images/airpods-pro-2.jpg",
    category: "Phụ kiện",
    description: "Chống ồn chủ động, âm thanh sống động.",
  },
];