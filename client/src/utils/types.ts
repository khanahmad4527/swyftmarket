export interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  discount: number;
  discountPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[][];
  colours: string[][];
  sizes: string[];
  quantity: number;
  description: string;
  brand: string;
  addedAt: string;
  updatedAt: string;
}
