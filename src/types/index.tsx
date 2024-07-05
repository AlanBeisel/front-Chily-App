export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  available: boolean;
  isPopular: boolean;
  category: Category[];
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


export interface ProductsInOrder {
  id: number;
  name: string;
  quantity: number;
  individualDiscount?: number;
  price: number;
}


export interface Order {
  id: string;
  userId: number;
  address: string;
  productsInOrder: ProductsInOrder[];
  generalDiscount?: number;
  shipping: number;
  total: number;
  finalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
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



export interface Address {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  note: string;
}