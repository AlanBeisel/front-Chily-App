"use client"
import React, { useState, useEffect } from 'react';
import { Address, ProductsInOrder } from '@/types';
import StatusTracker from './StatusTracker';

interface OrderProps {
  order: Order;
}

interface Order {
  id: number;
  userId: number;
  address: Address;
  details: ProductsInOrder[];
  formBuy: 'efectivo' | 'tarjeta';
  total: number;
  status:
    | 'Pendiente'
    | 'Confirmada'
    | 'En camino'
    | 'En preparación'
    | 'Entregada';
  date: string;
}

const OrderDetails: React.FC<OrderProps> = ({ order }) => {
  const [showStatusTracker, setShowStatusTracker] = useState(true);

  useEffect(() => {
    if (
      order.status === 'Confirmada' ||
      order.status === 'En preparación' ||
      order.status === 'En camino'
    ) {
      setShowStatusTracker(true);
    } else if (order.status === 'Entregada') {
      setShowStatusTracker(true);

      // Ocultar después de 5 minutos (300000 ms)
      const hideTimer = setTimeout(() => {
        setShowStatusTracker(false);
      }, 300000);


      return () => {
        clearTimeout(hideTimer);
      };
    }
    return undefined
  }, [order.status]);

  return (
    <div className="bg-red-500 text-white rounded-lg p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="text-sm">
          {new Date(order.date).toLocaleDateString()}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-bold mb-2">Productos:</div>
        <div className="text-white">Forma de pago: {order.formBuy} </div>
        {order.details.map((product, index) => (
          <div key={index} className="items-center mb-2">
            <div className="mr-2">{product.name}</div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-white">Cantidad: {product.quantity}</div>
              <div className="text-lg text-yellow-300 font-bold">
                ${order.total.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm mb-6 sm:mb-0 bg-white rounded-xl">
        {showStatusTracker && <StatusTracker status={order.status} />}
      </div>
    </div>
  );
};

export default OrderDetails;