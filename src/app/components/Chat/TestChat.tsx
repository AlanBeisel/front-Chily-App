'use client';

import React from 'react';
import OrderList from '../OrderComponents/OrderList';
import AdminChat from './AdminChat';

interface Address {
  id: number;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  note: string;
}

interface ProductsInOrder {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  userId: number;
  address: Address;
  details: ProductsInOrder[];
  formBuy: 'efectivo' | 'tarjeta';
  total: number;
  status: 'Pendiente' | 'Confirmada' | 'En camino' | 'Entregada';
  date: string;
}

interface OrderListProps {
  orders: Order[];
}

// Mock data
const mockOrders: Order = {
  id: 1,
  userId: 1,
  address: {
    id: 1,
    location: {
      lat: 1,
      lng: 1,
    },
    address: 'pepito',
    note: 'string',
  },
  details: [
    { productId: 1, name: 'Burger', quantity: 2, price: 5.99 },
    { productId: 2, name: 'Fries', quantity: 1, price: 2.99 },
  ],
  formBuy: 'tarjeta',
  total: 14.97,
  status: 'Entregada',
  date: new Date().toISOString(),
};

export const mockArr: Order[] = [mockOrders];

// TestChat Component
const TestChat: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="p-4 space-y-8">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <AdminChat />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <OrderList orders={orders} />
      </div>
    </div>
  );
};

export default TestChat;
