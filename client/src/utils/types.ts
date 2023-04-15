export interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  discount: number;
  realPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  quantity: number;
  description: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  _id: string;
  productId: string;
  userId: string;
  title: string;
  category: string;
  itemPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
  description: string;
}

export interface AddToCart {
  productId: string;
  title: string;
  category: string;
  itemPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
  description: string;
}

interface NestedAddress {
  street_address: string;
  apartment: string;
  city: string;
  state: string;
  pincode?: number;
}

export interface Address {
  _id: string;
  userId: string;
  country: string;
  firstname: string;
  lastname: string;
  mobile: string;
  address: NestedAddress;
  email: string;
}

export interface AddAddress {
  country: string;
  firstname: string;
  lastname: string;
  mobile: string;
  address: NestedAddress;
  email: string;
}

interface OrderItem {
  quantity: number;
  title: string;
  itemPrice: number;
}

export interface Order {
  _id: string;
  userId: string;
  orderDate: string;
  paidAmount: number;
  paymentMethod: string;
  items: OrderItem[];
}

export interface AddOrder {
  orderDate: string;
  paidAmount: number;
  paymentMethod: string;
  items: OrderItem[];
}

export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  type: string;
  minimumSpend: number;
  expires: string;
  description: string;
}

export interface ProductSearchParams {
  q?: string;
  category?: string[];
  brand?: string[];
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
  price_gte?: number | undefined;
  price_lte?: number | undefined;
  discount_gte?: number | undefined;
  discount_lte?: number | undefined;
  rating_gte?: number | undefined;
  rating_lte?: number | undefined;
  [key: string]: any;
}

export interface userData {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  hashedPassword: string;
  role: string;
}

export interface User {
  token: string;
  userData: userData;
}

export interface NewUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
