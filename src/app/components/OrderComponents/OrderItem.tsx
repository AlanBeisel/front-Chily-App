import React from 'react';
import { Order } from '@/types';

interface OrderProps {
  order: Order;
}

const OrderDetails: React.FC<OrderProps> = ({ order }) => {
  return (
    <div className="bg-red-500 text-white rounded-lg p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="text-sm font-bold">Order ID: {order.id}</div>
        <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-bold mb-2">Productos:</div>
        {order.products.map((product, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="mr-2">{product.productId}</div>
            <div className="text-white">Cantidad: {product.quantity}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm mb-6 sm:mb-0">Estado: {order.status}</div>
        <div className="text-lg text-yellow-300 font-bold">${order.totalAmount}</div>
      </div>
    </div>
  );
};

export default OrderDetails;
