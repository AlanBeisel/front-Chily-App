export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  isPopular: boolean;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
}
