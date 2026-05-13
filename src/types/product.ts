export interface DescriptionItem {
  type: "text" | "image";
  content?: string; // Dùng khi type là 'text'
  url?: string; // Dùng khi type là 'image'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  descriptionData?: DescriptionItem[]; // Trường mới để xen kẽ chữ và hình
  category: string;
  stock: number;
  rating?: number;
}
