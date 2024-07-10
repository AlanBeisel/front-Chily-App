import React from 'react';
import { Address, ProductsInOrder} from '@/types';
import StatusTracker from './StatusTracker';
import ChatWindow from './UserChat';

interface Order {
  id: number;
  userId: number;
  address: Address;
  details: ProductsInOrder[];
  formBuy: "efectivo" | "tarjeta";
  total: number;
  status: "Pendiente" | "Confirmada" | "En camino" | "Entregada";
  date: string;
}


interface OrderProps {
  order: Order;
}

const OrderDetails: React.FC<OrderProps> = ({ order }) => {
  return (
    <div className="bg-red-500 text-white rounded-lg p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="text-sm">{new Date(order.date).toLocaleDateString()}</div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-bold mb-2">Productos:</div>
        {order.details.map((product, index) => (
          <div key={index} className="items-center mb-2">
            <div className="mr-2">{product.name}</div>
            <div className="text-white">Cantidad: {product.quantity}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm mb-6 sm:mb-0 bg-white rounded-xl">
          <StatusTracker status= {order.status} />
        </div>
        <div className="text-lg text-yellow-300 font-bold">${order.total}</div>
      </div>
      <div>
        <ChatWindow orderId={order.id } problemDescription='problem' />
      </div>
    </div>
  );
};

export default OrderDetails;
