import React from 'react';
import OrderDetails from './OrderItem';
import { Address, ProductsInOrder } from '@/types';

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

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="mt-4">
      {orders.length === 0 ? (
        <div className="text-center">
          <p className="text-red-500">Todavía no realizaste ningun pedido. ¡Tentate!</p>
          <button className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Ir al Menú
          </button>
          </div>
          ) : (
      orders.map((order) => (
        <OrderDetails
          key={order.id}
          order={order}          
        />
      ))
    )} 
    </div>
  );
};

export default OrderList;
