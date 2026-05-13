export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Ảnh chính
  images?: string[]; // <-- THÊM DÒNG NÀY: Mảng chứa link các ảnh phụ (Gallery)
  category: string;
  stock: number;
  rating?: number;
}
