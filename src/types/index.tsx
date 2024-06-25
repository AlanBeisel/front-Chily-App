export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  available: boolean;
  isPopular: boolean;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  products: Product[];
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


export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
  onUpdateQuantity: (id: number, increment: number) => void;
  onRemove: (id: number) => void;
}

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}