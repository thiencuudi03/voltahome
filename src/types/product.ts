// Định nghĩa kiểu dữ liệu cho sản phẩm
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number; // Điểm đánh giá (1-5)
  // Có thể thêm các trường sau này nếu cần:
  // specs?: { ram: string; cpu: string; };
}

// Định nghĩa kiểu dữ liệu cho người dùng (nếu bạn cần trong tương lai)
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}
